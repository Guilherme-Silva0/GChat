'use client'
import Text from '@/components/Text'
import ThemeButton from '@/components/ThemeButton'
import { User } from '@prisma/client'
import UserBox from './UserBox'

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lb:block overflow-y-auto border-r border-gray-300 block w-full left-0 transition-all dark:border-slate-950">
      <div className="px-5">
        <div className="flex justify-between">
          <Text paragraph className="text-2xl font-bold py-4">
            People
          </Text>
          <ThemeButton />
        </div>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  )
}

export default UsersList
