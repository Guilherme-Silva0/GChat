'use client'

import useActiveList from '@/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'

const Avatar = ({ user }: { user?: User }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className="relative flex items-center">
      <div className="relative inline-block h-10 w-10 overflow-hidden rounded-full ring-2 ring-sky-600 md:h-11 md:w-11">
        <Image
          alt="Avatar user"
          src={user?.image || '/images/placeholder.jpg'}
          fill
          className="object-cover"
        />
      </div>
      {isActive && (
        <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-600 ring-2 ring-gray-200 dark:ring-slate-900 md:h-3 md:w-3" />
      )}
    </div>
  )
}

export default Avatar
