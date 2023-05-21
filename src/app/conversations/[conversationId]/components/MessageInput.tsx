'use client'

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormProps } from './FormMessage'
import clsx from 'clsx'

interface MessageInputProps {
  placeholder?: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FormProps>
  errors: FieldErrors<FormProps>
}

const MessageInput = ({
  id,
  errors,
  register,
  placeholder,
  required,
  type,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register('message', { required })}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-full bg-gray-300 px-4 py-2 font-light text-slate-900 focus:outline-none dark:bg-slate-950 dark:text-gray-200',
          errors.message && 'focus:ring-2 focus:ring-pink-700',
        )}
      />
    </div>
  )
}

export default MessageInput
