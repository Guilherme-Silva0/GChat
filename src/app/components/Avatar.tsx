'use client'

import useActiveList from '@/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import clsx from 'clsx'

interface AvatarProps {
  user?: User
  size?: 'sm' | 'lg'
}

const Avatar = ({ user, size }: AvatarProps) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className="relative flex items-center">
      <div
        className={clsx(
          'relative inline-block h-10 w-10 overflow-hidden rounded-full ring-2 ring-sky-600',
          size === 'sm' && 'h-7 w-7',
          size === 'lg' && 'h-20 w-20',
        )}
      >
        <Image
          alt="Avatar user"
          src={user?.image || '/images/placeholder.jpg'}
          fill
          className="object-cover"
        />
      </div>
      {isActive && (
        <span
          className={clsx(
            'absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-600 ring-2 ring-gray-200 dark:ring-slate-900',
            size === 'sm' && 'h-1.5 w-1.5',
            size === 'lg' && 'right-1 top-1 h-3 w-3',
          )}
        />
      )}
    </div>
  )
}

export default Avatar
