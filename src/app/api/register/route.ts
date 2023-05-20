import prismaClient from '@/libs/prisma'
import bcrypt from 'bcrypt'
import { randomInt } from 'crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().nonempty('All inputs are required'),
  email: z
    .string()
    .trim()
    .email('Invalid email')
    .nonempty('All inputs are required'),
  password: z
    .string()
    .trim()
    .nonempty('All inputs are required')
    .min(8, 'Password must be at least 8 caracters long'),
})

type DataProps = z.infer<typeof schema>

const getUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  })
  return user
}

export async function POST(req: Request) {
  const body: DataProps = await req.json()
  const { name, email, password } = body

  try {
    schema.parse({
      name,
      email,
      password,
    })
  } catch (error) {
    return new NextResponse('Invalid data', { status: 400 })
  }

  const userAlreadyExists = await getUserByEmail(email)
  if (userAlreadyExists) {
    return new NextResponse('E-mail already registed', { status: 400 })
  }

  const randomSalt = randomInt(10, 16)
  const hashedPassword = await bcrypt.hash(password, randomSalt)

  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log(error, 'ERROR_REGISTRATION')
    return new NextResponse('Internal erro', { status: 500 })
  }
}
