import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-950 p-2 rounded-lg border-2 shadow-lg">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:scale-0" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
    </div>
  );
}