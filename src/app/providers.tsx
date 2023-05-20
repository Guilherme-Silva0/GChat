'use client'
import AuthContext from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthContext>
      <ThemeProvider attribute="class">
        <ToasterContext />
        {children}
      </ThemeProvider>
    </AuthContext>
  )
}
