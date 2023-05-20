'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'

const ToasterContext = () => {
  const { theme } = useTheme()
  return (
    <Toaster
      toastOptions={{
        className: '',
        style: {
          backgroundColor: `${
            theme === 'light' ? 'rgb(249 250 251 / 1)' : 'rgb(51 65 85 / 1)'
          }`,
          color: `${
            theme === 'light' ? 'rgb(2 6 23/ 1)' : 'rgb(229 231 235 / 1)'
          }`,
        },
        duration: 5000,
      }}
    />
  )
}

export default ToasterContext
