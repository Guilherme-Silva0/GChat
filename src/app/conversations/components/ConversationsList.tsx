'use client'

import Text from '@/components/Text'
import ThemeButton from '@/components/ThemeButton'
import useConversation from '@/hooks/useConversation'
import { FullConversationType } from '@/types'
import clsx from 'clsx'
import { Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'

interface ConversationsListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationsList = ({ initialItems, users }: ConversationsListProps) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

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
