"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
  ModalProvider,
} from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle2, XCircle, AlertOctagon, Info, MonitorSmartphone, Car, Bot, MapPin, Navigation, Users } from "lucide-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NotificationService, NotificationType } from "@/services/NotificationService";
import { cn } from "@/lib/utils";
import {
  FourScreenIcon,
  CarSyncIcon,
  ZeekrGPTIcon,
  ZeekrPlacesIcon,
  NaviIcon,
  ZeekrCircleIcon,
} from "@/components/icons/app-icons";

interface NotificationTypeOption {
  value: NotificationType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface ApplicationIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const applicationIcons: ApplicationIcon[] = [
  {
    name: "4screen",
    icon: <FourScreenIcon className="h-5 w-5" />,
    color: "stroke-indigo-500 dark:stroke-indigo-400",
  },
  {
    name: "carsync",
    icon: <CarSyncIcon className="h-5 w-5" />,
    color: "stroke-cyan-500 dark:stroke-cyan-400",
  },
  {
    name: "ZeekrGPT",
    icon: <ZeekrGPTIcon className="h-5 w-5" />,
    color: "stroke-purple-500 dark:stroke-purple-400",
  },
  {
    name: "Zeekr Places",
    icon: <ZeekrPlacesIcon className="h-5 w-5" />,
    color: "stroke-rose-500 dark:stroke-rose-400",
  },
  {
    name: "Navi",
    icon: <NaviIcon className="h-5 w-5" />,
    color: "stroke-teal-500 dark:stroke-teal-400",
  },
  {
    name: "Zeekr Circle",
    icon: <ZeekrCircleIcon className="h-5 w-5" />,
    color: "stroke-orange-500 dark:stroke-orange-400",
  },
];

const notificationTypes: NotificationTypeOption[] = [
  {
    value: 'info',
    label: 'Information',
    icon: <Info className="h-4 w-4 stroke-[2.5]" />,
    color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300',
  },
  {
    value: 'warning',
    label: 'Warning',
    icon: <AlertOctagon className="h-4 w-4 stroke-[2.5]" />,
    color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
  {
    value: 'error',
    label: 'Error',
    icon: <XCircle className="h-4 w-4 stroke-[2.5]" />,
    color: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300',
  },
  {
    value: 'ack',
    label: 'Acknowledgment',
    icon: <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />,
    color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
];

function NotificationForm() {
  const [applications, setApplications] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState("");
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<NotificationType>("info");
  const [delay, setDelay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const notificationService = new NotificationService();
  const modal = useModal();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await notificationService.getApplications();
        setApplications(response.data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        toast.error('Failed to load applications');
      }
    };

    fetchApplications();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedApp || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Wait for the specified delay
      if (delay) {
        await new Promise(resolve => setTimeout(resolve, parseInt(delay) * 1000));
      }

      await notificationService.createNotification({
        application: selectedApp,
        type: selectedType,
        message: message,
        timestamp: new Date().toISOString(),
      });

      // Reset form but keep modal open
      setMessage("");
      setDelay("");
      toast.success("Notification sent successfully!");
    } catch (error) {
      console.error('Failed to send notification:', error);
      toast.error("Failed to send notification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalContent>
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
          Send a New Notification 📬
        </h4>

        <div className="space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Application Name
            </label>
            <div className="relative">
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an application</option>
                {applications.map((app) => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
              {selectedApp && (
                <div className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none",
                  applicationIcons.find(icon => icon.name === selectedApp)?.color
                )}>
                  {applicationIcons.find(icon => icon.name === selectedApp)?.icon}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
                Message
              </label>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
                Notification Type
              </label>
              <div className="relative">
                <div
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm cursor-pointer flex items-center justify-between"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1 rounded-md",
                      notificationTypes.find(t => t.value === selectedType)?.color
                    )}>
                      {notificationTypes.find(t => t.value === selectedType)?.icon}
                    </div>
                    <span className="font-medium">
                      {notificationTypes.find(t => t.value === selectedType)?.label}
                    </span>
                  </div>
                </div>
                {showTypeDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg divide-y divide-gray-100 dark:divide-gray-700">
                    {notificationTypes.map((type) => (
                      <div
                        key={type.value}
                        className={cn(
                          "px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700",
                          type.value === selectedType && "bg-gray-50 dark:bg-gray-700"
                        )}
                        onClick={() => {
                          setSelectedType(type.value);
                          setShowTypeDropdown(false);
                        }}
                      >
                        <div className={cn("p-1 rounded-md", type.color)}>
                          {type.icon}
                        </div>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Notification Delay (s)
            </label>
            <Input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              placeholder="Enter delay in seconds"
              min="0"
              step="1"
              className="w-full"
            />
          </div>
        </div>
      </ModalContent>
      <ModalFooter className="gap-4">
        <HoverBorderGradient
          type="button"
          containerClassName="rounded-md w-28"
          className="bg-gray-200 text-black dark:bg-black dark:text-white"
          onClick={() => modal.setOpen(false)}
        >
          Cancel
        </HoverBorderGradient>
        <HoverBorderGradient
          type="submit"
          containerClassName="rounded-md w-28"
          className={cn(
            "bg-black text-white dark:bg-white dark:text-black",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </HoverBorderGradient>
      </ModalFooter>
    </form>
  );
}

export function NotificationModal() {
  return (
    <div className="py-4 flex items-center justify-center">
      <ModalProvider>
        <Modal>
          <ModalTrigger>
            <HoverBorderGradient containerClassName="rounded-md" asChild>
              <div className="flex justify-center">
                <span className="group-hover:translate-x-40 text-center transition duration-500">
                  Send Notification
                </span>
                <div className="-translate-x-40 group-hover:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500">
                  <Send className="h-4 w-4" />
                </div>
              </div>
            </HoverBorderGradient>
          </ModalTrigger>
          <ModalBody>
            <NotificationForm />
          </ModalBody>
        </Modal>
      </ModalProvider>
    </div>
  );
}