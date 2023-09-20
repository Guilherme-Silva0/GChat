import prismaClient from '@/libs/prisma'
import getSession from './getSession'

const getUsers = async () => {
  const session = await getSession()

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = await prismaClient.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    })

    return users
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getUsers
