'use client'

import clsx from 'clsx'
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  secondary?: boolean
  danger?: boolean
  disable?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disable,
}) => {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 font-semibold transition-all focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95',
        disable && 'cursor-default opacity-50',
        fullWidth && 'w-full',
        secondary
          ? 'text-slate-900 dark:text-gray-200'
          : 'text-slate-200 dark:text-gray-900',
        danger &&
          'bg-rose-500 text-gray-200 hover:bg-rose-700 focus-visible:ring-rose-400',
        !secondary && !danger && 'bg-sky-600 hover:bg-sky-800',
      )}
    >
      {children}
    </button>
  )
}

export default Button
