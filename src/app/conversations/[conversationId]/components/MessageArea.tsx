'use client'

import { Conversation, User } from '@prisma/client'
import Body from './Body'
import FormMessage from './FormMessage'
import Header from './Header'
import { FullMessageType } from '@/types'
import { useState } from 'react'

interface SendMessageProps {
  conversation: Conversation & { users: User[] }
  messages: FullMessageType[]
}

const MessageArea = ({ conversation, messages }: SendMessageProps) => {
  const [isSending, setIsSending] = useState(false)
  return (
    <>
      <Header conversation={conversation} />
      <Body
        initialMessages={messages}
        conversation={conversation}
        isSending={isSending}
      />
      <FormMessage setIsSending={setIsSending} />
    </>
  )
}

export default MessageArea
