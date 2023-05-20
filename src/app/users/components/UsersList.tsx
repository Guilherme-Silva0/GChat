'use client'
import Text from '@/components/Text'
import ThemeButton from '@/components/ThemeButton'
import { User } from '@prisma/client'
import UserBox from './UserBox'

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <aside className="lb:block fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-300 pb-20 transition-all dark:border-slate-950 lg:left-20 lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex justify-between">
          <Text paragraph className="py-4 text-2xl font-bold">
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
