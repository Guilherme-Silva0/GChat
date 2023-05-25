'use client'

import Avatar from '@/app/components/Avatar'
import Text from '@/components/Text'
import { FullMessageType } from '@/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ImageModal'

interface MessageProps {
  data: FullMessageType
  isLast?: boolean
}

const Message = ({ data, isLast }: MessageProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const session = useSession()

  const isSender = session?.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(', ')

  const container = clsx('flex gap-2 p-3', isSender && 'justify-end')

  const avatar = clsx(isSender && 'order-2')

  const body = clsx('flex flex-col gap-2', isSender && 'items-end')

  const message = clsx(
    'w-fit max-w-xs h-fit break-words overflow-hidden lg:max-w-lg max-[390px]:max-w-[200px]',
    isSender ? 'bg-sky-600 text-gray-200' : 'bg-gray-800 text-gray-200',
    data.image ? 'rounded-md p-0' : 'rounded-[20px] py-2 px-4',
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} size="sm" />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <Text className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
            {data.sender.name}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-slate-400">
            {format(new Date(data.createdAt), 'p')}
          </Text>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              width={288}
              height={288}
              src={data.image}
              className="translate cursor-pointer object-cover transition-all hover:scale-105"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isSender && seenList.length > 0 && (
          <p className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</p>
        )}
      </div>
    </div>
  )
}

export default Message
