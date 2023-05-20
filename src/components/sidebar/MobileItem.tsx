'use client'

import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface MobileItemProps {
  icon: LucideIcon
  href: string
  onClick?: () => void
  active?: boolean
}

const MobileItem = ({ icon: Icon, href, onClick, active }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        'group flex justify-center gap-x-3 rounded-full p-3 text-sm font-semibold leading-6 text-gray-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow dark:hover:bg-slate-950 dark:hover:text-gray-200',
        active &&
          'bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-gray-200',
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}

export default MobileItem
