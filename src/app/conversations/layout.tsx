import getConversations from '@/actions/getConversations'
import Sidebar from '../../components/sidebar/Sidebar'
import ConversationsList from './components/ConversationsList'
import { ReactNode } from 'react'
import getUsers from '@/actions/getUsers'

export default async function ConversationsLayout({
  children,
}: {
  children: ReactNode
}) {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    // @ts-expect-error Server component
    <Sidebar>
      <div className="h-full">
        <ConversationsList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}
