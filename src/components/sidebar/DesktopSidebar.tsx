'use client'

import Avatar from '@/app/components/Avatar'
import useRoutes from '@/hooks/useRoutes'
import { User } from '@prisma/client'
import { useState } from 'react'
import DesktopItem from './DesktopItem'

const DesktopSidebar = ({ user }: { user: User }) => {
  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-gray-200 transition-all dark:lg:bg-slate-900 lg:border-r-[1px] lg:border-gray-300 dark:lg:border-slate-950 lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-75 transition-all"
        >
          <Avatar user={user} />
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar
