'use client'
import ActiveStatus from '@/components/ActiveStatus'
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
        <ActiveStatus />
        {children}
      </ThemeProvider>
    </AuthContext>
  )
}
