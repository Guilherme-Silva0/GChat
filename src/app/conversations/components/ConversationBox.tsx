'use client'

import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import Text from '@/components/Text'
import useOtherUser from '@/hooks/useOtherUser'
import { FullConversationType } from '@/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

interface ConversationBoxProps {
  item: FullConversationType
  selected?: boolean
}

const ConversationBox = ({ item, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(item)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`conversations/${item.id}`)
  }, [router, item.id])

  const lastMessage = useMemo(() => {
    const messages = item.messages || []

    return messages[messages.length - 1]
  }, [item.messages])

  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return lastMessage.sender?.email === userEmail
        ? 'You: ' + 'Sent an image'
        : 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage.sender?.email === userEmail
        ? 'You: ' + lastMessage?.body
        : lastMessage?.body
    }

    return 'Started a conversation'
  }, [lastMessage, userEmail])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all hover:bg-gray-300 dark:hover:bg-slate-800',
        selected && 'bg-gray-300 dark:bg-slate-800',
      )}
    >
      {item.isGroup ? (
        <AvatarGroup users={item.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="mb-1 min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <Text className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
            {item.name || otherUser.name}
          </Text>
          {lastMessage?.createdAt && (
            <Text className="text-xs font-light">
              {format(new Date(lastMessage.createdAt), 'p')}
            </Text>
          )}
        </div>
        <Text
          className={clsx(
            'overflow-hidden text-ellipsis whitespace-nowrap text-sm',
            hasSeen
              ? 'text-gray-500 dark:text-gray-500'
              : 'font-medium text-slate-900 dark:text-gray-100',
          )}
        >
          {lastMessageText}
        </Text>
      </div>
    </div>
  )
}

export default ConversationBox
