'use client'

import { User } from '@prisma/client'
import Image from 'next/image'

interface AvatarGroupProps {
  users: User[]
}

const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const sliceUsers = users.slice(0, 3)

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  }

  return (
    <div className="relative h-11 w-11">
      {sliceUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ring-2 ring-sky-600 ${
            positionMap[index as keyof typeof positionMap]
          }`}
        >
          <Image
            alt="avatar"
            fill
            src={user?.image || '/images/placeholder.jpg'}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
