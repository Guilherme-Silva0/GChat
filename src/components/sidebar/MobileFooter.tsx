'use client'

import useConversation from '@/hooks/useConversation'
import useRoutes from '@/hooks/useRoutes'
import MobileItem from './MobileItem'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-around border-t-[1px] border-gray-300 bg-gray-200 py-1 transition-all dark:border-slate-950 dark:bg-slate-900 lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default MobileFooter
