import { ThemeContext } from "@/context/ThemeContext";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent, useContext } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: "sm" | "lg";
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  isLoading,
  size,
}) => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      disabled={isLoading}
      className={`${
        size === "sm"
          ? "h-9 px-2 py-2"
          : size === "lg"
          ? "h-11 px-8 py-2"
          : size ?? "h-10 py-2 px-4"
      } active:scale-95 inline-flex items-center justify-center text-sm font-medium transition-all bg-slate-800 text-white rounded-md cursor-pointer dark:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-default hover:scale-105`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
};

export default Button;
