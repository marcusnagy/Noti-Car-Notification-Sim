import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface KeyValue {
  id: string;
  key: string;
  value: string;
}

export function ConfigurationModal() {
  const [isOpen, setIsOpen] = useState(false);
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
    // Here you would handle the form submission
    toast.success("Configuration saved successfully!");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50"
        variant="outline"
      >
        Configure
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-center">
                    Application Configuration
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
                      Configuration Key-Value Pairs
                    </label>
                    {keyValues.map((kv) => (
                      <div key={kv.id} className="flex gap-4 items-center">
                        <Input
                          value={kv.key}
                          onChange={(e) => updateKeyValue(kv.id, "key", e.target.value)}
                          placeholder="Key"
                          className="flex-1"
                        />
                        <div className="text-gray-400">:</div>
                        <Input
                          value={kv.value}
                          onChange={(e) =>
                            updateKeyValue(kv.id, "value", e.target.value)
                          }
                          placeholder="Value"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKeyValue(kv.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addKeyValue}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Key-Value Pair
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
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

                <Button type="submit" className="w-full">
                  Save Configuration
                </Button>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}