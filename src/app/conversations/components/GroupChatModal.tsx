'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import Text from '@/components/Text'
import { User } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

interface GroupChatModalProps {
  users: User[]
  isOpen?: boolean
  onClose: () => void
}

const schema = z.object({
  name: z.string().trim().nonempty('All inputs are required'),
  members: z.string().array().min(3),
})

export type FormGroupProps = z.infer<typeof schema>

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormGroupProps>({
    defaultValues: {
      name: '',
      members: [],
    },
  })

  const members = watch('members')

  const onSubmit = (data: FormGroupProps) => {
    setIsLoading(true)

    axios
      .post('/api/conversations', { ...data, isGroup: true })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch((err: AxiosError) =>
        toast.error((err.response?.data as string) ?? null),
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <Text paragraph className="text-lg font-semibold leading-7">
              Create a group
            </Text>
            <Text
              className={clsx(
                'mt-1 leading-6',
                errors.members && 'text-red-500',
              )}
            >
              Create a chat with more than 2 people.
            </Text>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                type="text"
                label="Name"
                id="name"
                errors={errors}
                register={register}
                required
                disabled={isLoading}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value as string[], {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button secondary disable={isLoading} type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button disable={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupChatModal
