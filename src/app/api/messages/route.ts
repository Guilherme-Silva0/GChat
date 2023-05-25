import getCurrentUser from '@/actions/getCurrentUser'
import prismaClient from '@/libs/prisma'
import { pusherServer } from '@/libs/pusher'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const { message, image, conversationId } = await req.json()

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unautorized', { status: 401 })
    }

    const newMessage = await prismaClient.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    })

    const updatedConversation = await prismaClient.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })

    await pusherServer.trigger(conversationId, 'messages:new', newMessage)

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) =>
      pusherServer.trigger(user.email as string, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      }),
    )

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log('ERROR_MESSAGES', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
