
import { GiNightSleep } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-primary hover:bg-primary   border-2 border-[rgb(28,28,28)]  hover:scale-105  dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold"
          size="icon"
        >
          <MdSunny className="h-[1.2rem] text-foreground w-[1.2rem] rotate-0 scale-100 transition-all   dark:-rotate-90 dark:scale-0" />
          <GiNightSleep className="absolute text-foreground h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-primary shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  border-r-2 border-b-2 border-[rgb(28,28,28)] dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]   dark:border-[rgb(240,249,255)]"
      >
        <DropdownMenuItem
          className="my-[0.15rem] hover:text-primary focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus: dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-[0.15rem] hover:text-primary focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-[0.15rem] hover:text-primary focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold "
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
