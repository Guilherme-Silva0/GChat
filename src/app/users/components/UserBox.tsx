'use client'
import Avatar from '@/app/components/Avatar'
import LoadingModal from '@/components/LoadingModal'
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
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all hover:bg-gray-300 dark:hover:bg-slate-800 "
      >
        <Avatar user={user} />
        <Text className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
          {user.name}
        </Text>
      </div>
    </>
  )
}

export default UserBox
