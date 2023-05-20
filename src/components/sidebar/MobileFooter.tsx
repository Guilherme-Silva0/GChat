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
    <div className="fixed flex items-center justify-around w-full py-1 bottom-0 z-40 bg-gray-200 border-t-[1px] border-gray-300 dark:bg-slate-900 transition-all dark:border-slate-950 lg:hidden">
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
