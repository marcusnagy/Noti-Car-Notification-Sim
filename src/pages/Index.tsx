import React, { useState } from "react";
import { PlayCircle, StopCircle, CheckCircle2, XCircle, AlertOctagon, MapPin, Info } from "lucide-react";
import { toast } from "sonner";
import { NotificationModal } from "@/components/Notification";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { RabbitMQClient, CarMetadata, Notification, GeneralNotificaiton } from "@/services/RabbitMQService";
import { AnimatedList } from "@/components/ui/animated-list";
import { Alert } from "@heroui/alert";
import { cn } from "@/lib/utils";

interface SimulatedCar {
  id: string;
  client: RabbitMQClient;
  interval: NodeJS.Timeout;
  latitude: number;
  longitude: number;
  battery: number;
  lastUpdate: Date;
}

interface NotificationItemProps {
  icon: React.ReactNode;
  color: 'warning' | 'default' | 'primary' | 'secondary' | 'success' | 'danger';
  message: string;
  timestamp: Date;
}

function getIcon(type: string) {
  const baseClasses = "h-5 w-5";
  
  switch (type.toLowerCase()) {
    case 'ack':
      return <CheckCircle2 className={cn(baseClasses, "text-emerald-500 dark:text-emerald-400")} strokeWidth={2} />;
    case 'info':
      return <Info className={cn(baseClasses, "text-blue-500 dark:text-blue-400")} strokeWidth={2} />;
    case 'warning':
      return <AlertOctagon className={cn(baseClasses, "text-amber-500 dark:text-amber-400")} strokeWidth={2} />;
    case 'error':
    case 'danger':
      return <XCircle className={cn(baseClasses, "text-red-500 dark:text-red-400")} strokeWidth={2} />;
    default:
      return <Info className={cn(baseClasses, "text-gray-500 dark:text-gray-400")} strokeWidth={2} />;
  }
}

function getColor(type: string): 'warning' | 'default' | 'primary' | 'secondary' | 'success' | 'danger' {
  switch (type.toLowerCase()) {
    case 'ack':
      return 'success';
    case 'info':
      return 'primary';
    case 'warning':
      return 'warning';
    case 'error':
    case 'danger':
      return 'danger';
    default:
      return 'default';
  }
}

interface UnifiedNotification {
  type: string;
  message: string;
  timestamp?: Date;
  application?: string;
  correlationId?: string;
}

const NotificationItem = ({ notification }: { notification: UnifiedNotification }) => {
  const notificationItem: NotificationItemProps = {
    icon: getIcon(notification.type),
    color: getColor(notification.type),
    message: notification.application 
      ? `[${notification.application}] ${notification.message}`
      : notification.message,
    timestamp: notification.timestamp
  }

  return (
    <Alert
      icon={notificationItem.icon}
      color={notificationItem.color}
      className={cn(
        "w-full backdrop-blur-sm border transition-all duration-200",
        "hover:scale-[101%] hover:shadow-lg",
        "dark:bg-gray-900/50 dark:border-gray-800",
        "relative overflow-hidden",
        {
          "bg-emerald-50/50 dark:bg-emerald-500/5": notificationItem.color === 'success',
          "bg-blue-50/50 dark:bg-blue-500/5": notificationItem.color === 'primary',
          "bg-amber-50/50 dark:bg-amber-500/5": notificationItem.color === 'warning',
          "bg-violet-50/50 dark:bg-violet-500/5": notificationItem.color === 'secondary',
        }
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <span className={cn(
              "font-medium block truncate",
              {
                "text-emerald-700 dark:text-emerald-300": notificationItem.color === 'success',
                "text-blue-700 dark:text-blue-300": notificationItem.color === 'primary',
                "text-amber-700 dark:text-amber-300": notificationItem.color === 'warning',
                "text-violet-700 dark:text-violet-300": notificationItem.color === 'secondary',
              }
            )}>{notification.type.toUpperCase()}</span>
          </div>
          <div className="flex-shrink-0 ml-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {notification.timestamp ? new Date(notification.timestamp).toLocaleTimeString() : 'Just now'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200">{notification.message}</p>
      </div>
    </Alert>
  );
};

const Index = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [notifications, setNotifications] = useState<UnifiedNotification[]>([]);
  const [simulatedCar, setSimulatedCar] = useState<SimulatedCar | null>(null);

  const startSimulation = async () => {
    const car: SimulatedCar = {
      id: crypto.randomUUID(),
      latitude: 59.3293 + Math.random() * 0.1,
      longitude: 18.0686 + Math.random() * 0.1,
      battery: 100.0 * (0.8 + Math.random() * 0.2),
      lastUpdate: new Date(),
      client: null,
      interval: null
    };

    const client = new RabbitMQClient();
    try {
      car.client = client;

      // Set up notification handling for both types
      await client.consumeNotifications((notification) => {
        console.log('Received notification:', JSON.stringify(notification, null, 2));
        setNotifications(prev => {
          const updatedNotifications = [...prev, notification];
          updatedNotifications.sort((a, b) => 
            (new Date(a.timestamp || Date.now())).getTime() - 
            (new Date(b.timestamp || Date.now())).getTime()
          );
          return updatedNotifications.slice(-50);
        });

        // Only check correlation ID for car notifications (not general notifications)
        if ('correlationId' in notification && client.isPendingRequest(notification.correlationId)) {
          client.clearPendingRequest(notification.correlationId);
        }
      });

      // Start the car simulation loop
      const interval = setInterval(() => {
        // Update position
        car.latitude += (Math.random() * 0.001 - 0.0005);
        car.longitude += (Math.random() * 0.001 - 0.0005);

        // Update battery (drain 1-3% each tick)
        car.battery -= (Math.random() * 2 + 1);
        if (car.battery < 0) {
          car.battery = 100.0; // "Recharge"
        }

        car.lastUpdate = new Date();

        const metadata: CarMetadata = {
          latitude: car.latitude,
          longitude: car.longitude,
          battery: car.battery,
          timestamp: car.lastUpdate
        };

        // Publish update
        if (car.client) {
          car.client.publishMetadataAsync(metadata)
            .catch(error => {
              console.error('Error publishing metadata:', error);
            });
        }
      }, 5000);
      
      car.interval = interval;
      setSimulatedCar(car);
      setIsSimulating(true);

      toast.success("Simulation started!", {
        style: {
          background: "linear-gradient(to right, #22c55e, #16a34a)",
          border: "none",
          color: "white",
          fontSize: "16px",
        },
        duration: 2000,
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
    } catch (error) {
      console.error('Failed to initialize RabbitMQ:', error);
      toast.error("Failed to start simulation!", {
        style: {
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          border: "none",
          color: "white",
          fontSize: "16px",
        },
        duration: 2000,
        icon: <XCircle className="h-5 w-5" />,
      });
    }
  };

  const stopSimulation = () => {
    if (simulatedCar?.client) {
      clearInterval(simulatedCar.interval);
      simulatedCar.client.disconnect();
      setSimulatedCar(null);
    }
    setIsSimulating(false);
    setNotifications([]);
    toast.error("Simulation stopped!", {
      style: {
        background: "linear-gradient(to right, #ef4444, #dc2626)",
        border: "none",
        color: "white",
        fontSize: "16px",
      },
      duration: 2000,
      icon: <XCircle className="h-5 w-5" />,
    });
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-50">
        <NotificationModal />
      </div>
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center p-4 md:p-8">
        <div className="relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center gap-8">
            <HoverBorderGradient
              containerClassName="rounded-xl"
              onClick={isSimulating ? stopSimulation : startSimulation}
              className={cn(
                "px-8 py-6 text-lg",
                isSimulating ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600",
                "text-white"
              )}
            >
              <div className="flex items-center gap-2">
                {isSimulating ? (
                  <>
                    <StopCircle className="w-6 h-6" />
                    Stop Simulation
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-6 h-6" />
                    Start Simulation
                  </>
                )}
              </div>
            </HoverBorderGradient>

            {simulatedCar && (
              <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Car Status</h2>
                <div className="space-y-1 text-sm">
                  <p>Location: ({simulatedCar.latitude.toFixed(4)}, {simulatedCar.longitude.toFixed(4)})</p>
                  <p>Battery: {simulatedCar.battery.toFixed(1)}%</p>
                  <p>Last Update: {simulatedCar.lastUpdate.toLocaleTimeString()}</p>
                </div>
              </div>
            )}

            <div className="w-full max-w-2xl">
              <div className="relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg border bg-background p-6 md:shadow-xl">
                <AnimatedList>
                  {notifications.map((notification, idx) => (
                    <NotificationItem notification={notification} key={idx} />
                  ))}
                </AnimatedList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;