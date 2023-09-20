import prismaClient from '@/libs/prisma'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.id) {
    return []
  }

  try {
    const conversations = await prismaClient.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })

    return conversations
  } catch (_error) {
    console.error(_error)
    return []
  }
}

export default getConversations
