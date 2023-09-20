import prismaClient from '@/libs/prisma'

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismaClient.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return messages
  } catch (_error) {
    console.error(_error)
    return []
  }
}

export default getMessages
