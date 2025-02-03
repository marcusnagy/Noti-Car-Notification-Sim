import { AMQPWebSocketClient, AMQPChannel } from '@cloudamqp/amqp-client';
import { v4 as uuidv4 } from 'uuid';


// Constants matching the Go code
const CAR_EXCHANGE = 'car.events';
const CAR_METADATA_QUEUE = 'car.metadata';
const CAR_NOTIFICATION_QUEUE = 'car.notifications.';

export interface CarMetadata {
  latitude: number;
  longitude: number;
  battery: number;
  timestamp: Date;
}

export interface Notification {
  type: string;
  message: string;
  correlationId: string;
  timestamp?: Date;
}

export class RabbitMQClient {
  private client: AMQPWebSocketClient;
  private channel: AMQPChannel;
  private notificationQueue: string = '';
  private pendingRequests: Set<string> = new Set();
  private pendingRequestsMutex: Promise<void> = Promise.resolve();
  private connectionPromise: Promise<void>;
  private isConnected: boolean = false;

  constructor() {
    this.connectionPromise = this.connect();
  }

  private async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    const tls = window.location.protocol === 'https:';
    const port = tls ? 15675 : 15670;
    const wsProtocol = tls ? 'wss' : 'ws';
    const url = `${wsProtocol}://localhost:${port}/`;
    
    console.log('Attempting to connect to RabbitMQ WebSocket at:', url);
    
    try {
      this.client = new AMQPWebSocketClient(url, '/', 'guest', 'guest');
      
      this.client.onerror = (error) => {
        console.error('AMQP error:', error);
        this.isConnected = false;
        // Attempt to reconnect after error
        setTimeout(() => this.connect(), 5000);
      };

      await this.client.connect();
      this.channel = await this.client.channel();
      
      this.channel.onerror = (error) => {
        console.error('AMQP Channel error:', error);
        this.isConnected = false;
        // Attempt to reconnect after channel error
        setTimeout(() => this.connect(), 5000);
      };

      await this.channel.exchangeDeclare(
        CAR_EXCHANGE,
        'topic',
        {
          durable: true,
          autoDelete: false,
          internal: false,
        }
      );

      const queueResult = await this.channel.queueDeclare(
        "",
        {
          durable: false,
          autoDelete: true,
          exclusive: true,
        }
      );

      if (queueResult) {
        this.notificationQueue = queueResult.name;
        console.log('Queue created:', this.notificationQueue);
      }

      this.isConnected = true;
    } catch (error) {
      console.error('Failed to connect:', error);
      this.isConnected = false;
      // Attempt to reconnect after failed connection
      setTimeout(() => this.connect(), 5000);
    }
  }

  disconnect(): void {
    if (this.channel && !this.channel.closed) {
      this.channel.close();
      console.log('Disconnected from RabbitMQ');
    }
    if (this.client && !this.client.closed) {
      this.client.close();
      console.log('Disconnected from RabbitMQ');
    }
  }

  isPendingRequest(correlationId: string): boolean {
    return this.pendingRequests.has(correlationId);
  }

  clearPendingRequest(correlationId: string): void {
    this.pendingRequestsMutex = this.pendingRequestsMutex.then(() => {
      this.pendingRequests.delete(correlationId);
    });
  }

  async publishMetadataAsync(metadata: CarMetadata): Promise<void> {
    await this.connectionPromise;
    return new Promise((resolve, reject) => {
      try {
        const correlationId = uuidv4();
        this.pendingRequestsMutex = this.pendingRequestsMutex.then(() => {
          this.pendingRequests.add(correlationId);
        });

        console.log('Publishing metadata to queue:', CAR_METADATA_QUEUE);
        console.log('Notification queue:', this.notificationQueue);
        this.channel.basicPublish(
          CAR_EXCHANGE,
          CAR_METADATA_QUEUE,
          JSON.stringify(metadata),
          {
            'contentType': 'application/json',
            'correlationId': correlationId,
            'replyTo': `${this.notificationQueue}`,
          },
          false,
          false
        ).catch((error) => {
          console.error('Failed to publish metadata:', error);
        });
        console.log('Published metadata with correlation ID:', correlationId);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async consumeNotifications(handler: (notification: Notification) => void): Promise<void> {
    await this.connectionPromise;
    
    if (!this.isConnected || !this.channel || this.channel.closed) {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      try {
        // First ensure the queue is bound
        this.channel.queueBind(
          this.notificationQueue,
          CAR_EXCHANGE,
          CAR_NOTIFICATION_QUEUE + this.notificationQueue,
          {}
        ).then(() => {
          // Only start consuming after successful binding
          return this.channel.basicConsume(
            this.notificationQueue,
            {
              'noAck': true,
              'exclusive': true,  // Changed to true to ensure single consumer
            },
            (message) => {
              try {
                console.log('Received message on queue:', message);
                const decoder = new TextDecoder();
                const bodyString = decoder.decode(message.body);
                const notification: Notification = JSON.parse(bodyString);
                handler(notification);
              } catch (error) {
                console.error('Error processing message:', error);
              }
            }
          );
        }).then(() => {
          console.log('Successfully subscribed to notifications queue:', this.notificationQueue);
          resolve();
        }).catch((error) => {
          console.error('Failed to set up consumer:', error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getNotificationQueue(): string {
    return this.notificationQueue;
  }
}