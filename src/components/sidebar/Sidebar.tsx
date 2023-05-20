import getCurrentUser from '@/actions/getCurrentUser'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import { ReactNode } from 'react'

export default async function Sidebar({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  return (
    <div className="h-full">
      <DesktopSidebar user={user!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  )
}
