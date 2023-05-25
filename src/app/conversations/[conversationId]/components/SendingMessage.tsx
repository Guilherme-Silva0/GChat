'use client'

import Avatar from '@/app/components/Avatar'
import { FullMessageType } from '@/types'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Text from '@/components/Text'
import { Clock } from 'lucide-react'

const SendingMessage = ({ messages }: { messages: FullMessageType[] }) => {
  const session = useSession()
  const messagesOfCurrentUser = messages.filter(
    (message) => message.sender.email === session.data?.user?.email,
  )
  const currentUser =
    messagesOfCurrentUser[messagesOfCurrentUser.length - 1]?.sender

  return (
    <div className="flex animate-pulse justify-end gap-2 p-3">
      <div className="order-2">
        <Avatar user={currentUser} size="sm" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1">
          <Text className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
            {currentUser?.name}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-slate-400">
            {format(new Date(), 'p')}
          </Text>
        </div>
        <div className="h-fit w-fit max-w-xs overflow-hidden break-words rounded-[20px] bg-sky-600 px-4 py-2 text-gray-200">
          <div>
            <Clock size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendingMessage
