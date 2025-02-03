"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { Plus, X, Send } from "lucide-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface KeyValue {
  id: string;
  key: string;
  value: string;
}

export function NotificationModal() {
  const [appName, setAppName] = useState("");
  const [keyValues, setKeyValues] = useState<KeyValue[]>([
    { id: crypto.randomUUID(), key: "", value: "" },
  ]);
  const [delay, setDelay] = useState("");

  const addKeyValue = () => {
    setKeyValues([...keyValues, { id: crypto.randomUUID(), key: "", value: "" }]);
  };

  const removeKeyValue = (id: string) => {
    if (keyValues.length === 1) return;
    setKeyValues(keyValues.filter((kv) => kv.id !== id));
  };

  const updateKeyValue = (
    id: string,
    field: "key" | "value",
    value: string
  ) => {
    setKeyValues(
      keyValues.map((kv) =>
        kv.id === id ? { ...kv, [field]: value } : kv
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission to the RabbitMQ API
    toast.success("Notification sent successfully!");
    const modal = useModal();
    modal.setOpen(false);
  };

  const ModalFormContent = () => {
    const modal = useModal();
    
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
              <Input
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Enter application name"
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
                Notification Parameters
              </label>
              {keyValues.map((kv) => (
                <div key={kv.id} className="flex gap-4 items-center">
                  <Input
                    value={kv.key}
                    onChange={(e) => updateKeyValue(kv.id, "key", e.target.value)}
                    placeholder="Key"
                    className="flex-1"
                  />
                  <div className="text-neutral-400">:</div>
                  <Input
                    value={kv.value}
                    onChange={(e) =>
                      updateKeyValue(kv.id, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="flex-1"
                  />
                  <HoverBorderGradient
                    containerClassName="rounded-md"
                    onClick={() => removeKeyValue(kv.id)}
                  >
                    <X className="h-4 w-4" />
                  </HoverBorderGradient>
                </div>
              ))}
              <HoverBorderGradient
                containerClassName="rounded-md w-full"
                onClick={addKeyValue}
              >
                <div className="flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Parameter
                </div>
              </HoverBorderGradient>
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
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            Send
          </HoverBorderGradient>
        </ModalFooter>
      </form>
    );
  };

  return (
    <div className="py-4 flex items-center justify-center">
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
          <ModalFormContent />
        </ModalBody>
      </Modal>
    </div>
  );
}