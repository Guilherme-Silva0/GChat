import getCurrentUser from '@/actions/getCurrentUser'
import prismaClient from '@/libs/prisma'
import { NextResponse } from 'next/server'

interface Params {
  conversationId?: string
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingConversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
    })

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    const deletedConversation = await prismaClient.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    })

    return NextResponse.json(deletedConversation)
  } catch (error) {
    console.log('ERROR_CONVERSATION_DELETE', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
