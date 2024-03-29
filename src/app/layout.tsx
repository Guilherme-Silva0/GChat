import { Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ReactNode } from 'react'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'GChat',
  description: 'A simple chat',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={outfit.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
