import { FunctionComponent, ReactNode } from 'react'

interface TextProps {
  children: ReactNode
  paragraph?: boolean
  className?: string
}

const Text: FunctionComponent<TextProps> = ({
  children,
  paragraph,
  className,
}) => {
  return paragraph ? (
    <h2
      className={`text-slate-950 transition-all dark:text-gray-200 ${className}`}
    >
      {children}
    </h2>
  ) : (
    <p
      className={`text-slate-950 transition-all dark:text-gray-200 ${className}`}
    >
      {children}
    </p>
  )
}

export default Text
