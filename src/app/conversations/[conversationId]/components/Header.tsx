'use client'

import Avatar from '@/app/components/Avatar'
import Text from '@/components/Text'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

interface HeaderProps {
  conversation: Conversation & { users: User[] }
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  return (
    <header className="flex w-full items-center justify-between border-b-[1px] border-gray-300 bg-gray-200 px-4 py-3 shadow-sm transition-all dark:border-slate-950 dark:bg-slate-900 sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="block cursor-pointer text-sky-500 transition-all hover:text-sky-800 lg:hidden"
        >
          <ChevronLeftIcon size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <Text>{conversation.name || otherUser.name}</Text>
          <Text className="text-sm font-light">{statusText}</Text>
        </div>
      </div>
      <MoreVerticalIcon
        size={32}
        onClick={() => {}}
        className="cursor-pointer text-sky-500 transition-all hover:text-sky-800"
      />
    </header>
  )
}

export default Header
