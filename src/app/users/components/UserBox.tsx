'use client'
import Avatar from '@/app/components/Avatar'
import Text from '@/components/Text'
import { User } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

const UserBox = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, SetIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    SetIsLoading(true)
    axios
      .post('api/conversations', {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`)
      })
      .catch((error: AxiosError) => {
        toast.error((error.response?.data as string) ?? null)
      })
      .finally(() => SetIsLoading(false))
  }, [router, user])

  return (
    <div
      onClick={handleClick}
      className="flex items-center relative w-full space-x-3 p-3 rounded-lg transition-all cursor-pointer dark:hover:bg-slate-800 hover:bg-gray-300 "
    >
      <Avatar user={user} />
      <Text className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        {user.name}
      </Text>
    </div>
  )
}

export default UserBox
