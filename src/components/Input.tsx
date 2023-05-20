import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { FunctionComponent, useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormProps } from '../app/components/AuthForm'

interface InputProps {
  label: string
  id: string
  type: string
  required?: boolean
  register: UseFormRegister<FormProps>
  errors: FieldErrors<FormProps>
  disabled?: boolean
}

const Input: FunctionComponent<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleInputPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleInputType = () => {
    if (type === 'password') {
      if (showPassword) return 'text'
      return 'password'
    } else {
      return type
    }
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium capitalize leading-6 text-slate-900 transition-all dark:text-gray-200"
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
            'focus:ring-third focus:placeholder-third h-11 w-full rounded-lg px-4 py-2 placeholder-gray-400 shadow-inside outline-none transition-all focus:border-none focus:ring-2 dark:border-none dark:bg-slate-900 dark:text-gray-100 dark:shadow-lg',
            errors[id as keyof FormProps] && 'focus:ring-rose-600',
            disabled && 'cursor-default opacity-50',
          )}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-full transform rounded-full p-1 text-base text-slate-800 transition-all active:bg-gray-950/20 dark:text-gray-200 dark:active:bg-gray-100/20"
            onClick={toggleInputPassword}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
