import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar/Sidebar'
import UsersList from './components/UsersList'
import { ReactNode } from 'react'
import getCurrentUser from '@/actions/getCurrentUser'

export default async function UsersLayout({
  children,
}: {
  children: ReactNode
}) {
  const users = await getUsers()
  const user = await getCurrentUser()
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UsersList users={users} user={user!} />
        {children}
      </div>
    </Sidebar>
  )
}
