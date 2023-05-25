'use client'

import Text from '@/components/Text'
import ThemeButton from '@/components/ThemeButton'
import useConversation from '@/hooks/useConversation'
import { FullConversationType } from '@/types'
import clsx from 'clsx'
import { Users2Icon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'

interface ConversationsListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationsList = ({ initialItems, users }: ConversationsListProps) => {
  const session = useSession()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) return undefined

    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            }
          }

          return currentConversation
        }),
      )
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((conv) => conv.id !== conversation.id)]
      })

      if (conversationId === conversation.id) {
        router.push('/conversations')
      }
    }

    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }
  }, [pusherKey, conversationId, router])

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          'fixed inset-y-0 overflow-y-auto border-r border-gray-300 pb-20 transition-all dark:border-slate-950 lg:left-20 lg:block lg:w-80 lg:pb-0',
          isOpen ? 'hidden' : 'left-0 block w-full',
        )}
      >
        <div className="px-5">
          <div className="flex items-center justify-between py-4">
            <Text paragraph className="text-2xl font-bold ">
              Messages
            </Text>
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer rounded-full p-2 text-gray-500 transition-all hover:opacity-70"
              >
                <Users2Icon />
              </div>
              <ThemeButton className="p-2 text-gray-500 transition-all hover:opacity-70 dark:text-gray-500" />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              item={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationsList
