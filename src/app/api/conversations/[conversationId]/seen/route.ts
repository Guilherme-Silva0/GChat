import getCurrentUser from '@/actions/getCurrentUser'
import prismaClient from '@/libs/prisma'
import { pusherServer } from '@/libs/pusher'
import { NextResponse } from 'next/server'

interface Params {
  conversationId?: string
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    const updatedMessage = await prismaClient.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage],
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(
      conversationId as string,
      'message:update',
      updatedMessage,
    )

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log('ERROR_MESSAGES_SEEN', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
