'use client'
import { useState } from 'react'
import Text from '@/components/Text'
import ThemeButton from '@/components/ThemeButton'
import { User } from '@prisma/client'
import UserBox from './UserBox'
import Avatar from '@/app/components/Avatar'
import SettingsModal from '@/components/sidebar/SettingsModal'

const UsersList = ({ users, user }: { users: User[]; user: User }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal
        currentUser={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <aside className="lb:block fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-300 pb-20 transition-all dark:border-slate-950 lg:left-20 lg:w-80 lg:pb-0">
        <div className="px-5">
          <div className="flex justify-between">
            <Text paragraph className="py-4 text-2xl font-bold">
              People
            </Text>
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer p-2 lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Avatar user={user} size="sm" />
              </div>
              <ThemeButton className="p-2 text-gray-500 transition-all hover:opacity-70 dark:text-gray-500" />
            </div>
          </div>
          {users.map((user) => (
            <UserBox key={user.id} user={user} />
          ))}
        </div>
      </aside>
    </>
  )
}

export default UsersList
