import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormProps } from "../app/components/AuthForm";

interface InputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
  disabled?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleInputPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputType = () => {
    if (type === "password") {
      if (showPassword) return "text";
      return "password";
    } else {
      return type;
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-slate-900 capitalize transition-all dark:text-gray-200"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={handleInputType()}
          autoComplete={id}
          disabled={disabled}
          {...register(id as keyof FormProps, { required })}
          placeholder={`Enter your ${label}...`}
          className={clsx(
            "w-full h-11 rounded-lg py-2 px-4 outline-none placeholder-gray-400 transition-all shadow-inside dark:shadow-lg dark:bg-slate-900 dark:text-gray-100 dark:border-none focus:ring-2 focus:ring-third focus:placeholder-third focus:border-none",
            errors[id as keyof FormProps] && "focus:ring-rose-600",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {type === "password" && (
          <button
            type="button"
            className="text-slate-800 text-base p-1 rounded-full absolute top-1/2 right-10 transform -translate-y-1/2 translate-x-full transition-all dark:text-gray-200 dark:active:bg-gray-100/20 active:bg-gray-950/20"
            onClick={toggleInputPassword}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
