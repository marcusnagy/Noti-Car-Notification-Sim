import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-950 p-2 rounded-lg border-2 shadow-lg">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
        className="w-[3rem] h-[1.5rem]"
      >
        <Sun className="h-3 w-3 rotate-0 scale-100 transition-all absolute top-1/2 left-[4px] -translate-y-1/2 text-yellow-500 dark:scale-0" />
        <Moon className="h-3 w-3 rotate-90 scale-0 transition-all absolute top-1/2 right-[4px] -translate-y-1/2 text-blue-500 dark:rotate-0 dark:scale-100" />
      </Switch>
    </div>
  );
}