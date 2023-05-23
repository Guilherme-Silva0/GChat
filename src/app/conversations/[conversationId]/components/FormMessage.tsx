'use client'

import useConversation from '@/hooks/useConversation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ImageIcon, SendIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import MessageInput from './MessageInput'
import { CldUploadButton } from 'next-cloudinary'
import { toast } from 'react-hot-toast'

const schema = z.object({
  message: z.string().trim().nonempty('All inputs are required'),
})

export type FormProps = z.infer<typeof schema>

const FormMessage = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormProps>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormProps) => {
    axios
      .post('/api/messages', {
        ...data,
        conversationId,
      })
      .catch((err: AxiosError) =>
        toast.error((err.response?.data as string) ?? null),
      )
      .finally(() => setValue('message', ''))
  }

  const handleUpload = (file: any) => {
    axios
      .post('/api/messages', {
        image: file?.info?.secure_url,
        conversationId,
      })
      .catch((err: AxiosError) =>
        toast.error((err.response?.data as string) ?? null),
      )
  }

  return (
    <div className="bottom-0 flex w-full items-center gap-2 bg-gray-200 p-4 transition-all dark:bg-slate-900 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1, maxFileSize: 5242880 }} // max size 5mb
        onUpload={handleUpload}
        uploadPreset="yxbk8cqd"
      >
        <ImageIcon
          size={30}
          className="text-sky-500 transition-all hover:text-sky-800"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
          type={'text'}
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 text-gray-200 transition-all hover:bg-sky-800 dark:text-slate-900"
        >
          <SendIcon size={20} className="relative -bottom-[1px] -left-[2px]" />
        </button>
      </form>
    </div>
  )
}

export default FormMessage
