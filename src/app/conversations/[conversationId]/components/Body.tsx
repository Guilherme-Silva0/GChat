'use client'

import useConversation from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import Message from './Message'
import axios from 'axios'
import Image from 'next/image'
import Text from '@/components/Text'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

interface BodyProps {
  initialMessages: FullMessageType[]
  conversation: Conversation & { users: User[] }
}

const Body = ({ initialMessages, conversation }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation()

  const otherUser = useOtherUser(conversation)

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })

      bottomRef.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage
          }

          return currentMessage
        }),
      )
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-4 transition-all sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/hello-animate.svg"
            alt="hello animate image"
            height={400}
            width={400}
          />
          <Text paragraph className="text-2xl font-semibold">
            How about sending &quot;Hi! 😁️&quot; to {otherUser.name}?
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <Message
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body
