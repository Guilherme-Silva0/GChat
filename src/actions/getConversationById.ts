import getCurrentUser from '@/actions/getCurrentUser'
import prismaClient from '@/libs/prisma'

const getConversationsById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return null
    }

    const conversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    return conversation
  } catch (_error) {
    console.error(_error)
    return null
  }
}

export default getConversationsById
