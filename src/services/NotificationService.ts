export type NotificationType = 'warning' | 'danger' | 'ack' | 'error' | 'info';

export interface Notification {
  application: string;
  message: string;
  timestamp?: string;
  type: NotificationType;
}

export class NotificationService {
  private baseUrl: string = '/api'; // Proxied to localhost:8080

  async getHealth(): Promise<Record<string, string>> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getApplications(): Promise<Record<string, any>> {
    const response = await fetch(`${this.baseUrl}/v1/applications`);
    if (!response.ok) {
      throw new Error(`Failed to fetch applications: ${response.statusText}`);
    }
    return response.json();
  }

  async getNotificationTypes(): Promise<Record<string, any>> {
    const response = await fetch(`${this.baseUrl}/v1/notifications/types`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notification types: ${response.statusText}`);
    }
    return response.json();
  }

  async createNotification(notification: Notification): Promise<Record<string, string>> {
    const response = await fetch(`${this.baseUrl}/v1/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create notification: ${response.statusText}\n${JSON.stringify(errorData)}`
      );
    }

    return response.json();
  }
}
    