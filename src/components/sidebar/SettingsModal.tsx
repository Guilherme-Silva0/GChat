'use client'

import { User } from '@prisma/client'
import Modal from '../Modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Text from '../Text'
import Input from '../Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../Button'

interface SettingsModalProps {
  currentUser: User
  isOpen?: boolean
  onClose: () => void
}

const schema = z.object({
  name: z.string().trim().nonempty('All inputs are required'),
  image: z.string().url().trim().nonempty('All inputs are required'),
})

export type FormEditProps = z.infer<typeof schema>

const SettingsModal = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormEditProps>({
    defaultValues: {
      name: currentUser?.name as string,
      image: currentUser?.image as string,
    },
    resolver: zodResolver(schema),
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { shouldValidate: true })
  }

  const onSubmit = async (data: FormEditProps) => {
    setIsLoading(true)
    axios
      .put('/api/settings', data)
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <Text paragraph className="text-lg font-semibold leading-7">
              Profile
            </Text>
            <Text className="mt-1 leading-6">Edit your public profile.</Text>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                type="text"
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium capitalize leading-6 text-slate-900 transition-all dark:text-gray-200"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1, maxFileSize: 5242880 }} // max size 5mb
                    onUpload={handleUpload}
                    uploadPreset="yxbk8cqd"
                  >
                    <Button disable={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button secondary disable={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disable={isLoading}>
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default SettingsModal
