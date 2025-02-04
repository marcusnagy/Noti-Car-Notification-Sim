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
import { Send, CheckCircle2, XCircle, AlertOctagon, Info } from "lucide-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NotificationService, NotificationType } from "@/services/NotificationService";
import { cn } from "@/lib/utils";

interface NotificationTypeOption {
  value: NotificationType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const notificationTypes: NotificationTypeOption[] = [
  {
    value: 'info',
    label: 'Information',
    icon: <Info className="h-4 w-4" />,
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    value: 'warning',
    label: 'Warning',
    icon: <AlertOctagon className="h-4 w-4" />,
    color: 'text-amber-500 dark:text-amber-400',
  },
  {
    value: 'error',
    label: 'Error',
    icon: <XCircle className="h-4 w-4" />,
    color: 'text-red-500 dark:text-red-400',
  },
  {
    value: 'ack',
    label: 'Acknowledgment',
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: 'text-emerald-500 dark:text-emerald-400',
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
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an application</option>
                {applications.map((app) => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
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
                    {notificationTypes.find(t => t.value === selectedType)?.icon}
                    <span className={cn(
                      notificationTypes.find(t => t.value === selectedType)?.color
                    )}>
                      {notificationTypes.find(t => t.value === selectedType)?.label}
                    </span>
                  </div>
                </div>
                {showTypeDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg">
                    {notificationTypes.map((type) => (
                      <div
                        key={type.value}
                        className={cn(
                          "px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                          type.value === selectedType && "bg-gray-100 dark:bg-gray-700"
                        )}
                        onClick={() => {
                          setSelectedType(type.value);
                          setShowTypeDropdown(false);
                        }}
                      >
                        {type.icon}
                        <span className={type.color}>{type.label}</span>
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