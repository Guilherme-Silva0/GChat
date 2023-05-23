import getCurrentUser from '@/actions/getCurrentUser'
import prismaClient from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const { name, image } = await req.json()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log('ERROR_SETTINGS', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
