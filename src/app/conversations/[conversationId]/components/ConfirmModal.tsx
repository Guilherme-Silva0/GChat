'use client'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Text from '@/components/Text'
import useConversation from '@/hooks/useConversation'
import { Dialog } from '@headlessui/react'
import axios, { AxiosError } from 'axios'
import { Trash2Icon, AlertTriangleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal = ({ onClose, isOpen }: ConfirmModalProps) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .catch((err: AxiosError) =>
        toast.error((err.response?.data as string) ?? null),
      )
      .finally(() => setIsLoading(false))
  }, [conversationId, router, onClose])

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <AlertTriangleIcon className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-semibold leading-6 text-slate-900 transition-all dark:text-gray-200"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <Text className="text-sm">
              Are you sure you want to delete this conversation? This action
              cannot be reversed.
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-5 flex sm:mt-4 ">
        <Button disable={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
        <Button disable={isLoading} danger onClick={onDelete}>
          <Trash2Icon className="mr-1" /> Delete
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
