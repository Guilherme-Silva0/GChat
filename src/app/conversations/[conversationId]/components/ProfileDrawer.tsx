'use client'

import Avatar from '@/app/components/Avatar'
import Text from '@/components/Text'
import useOtherUser from '@/hooks/useOtherUser'
import { Dialog, Transition } from '@headlessui/react'
import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import { Trash2Icon, XIcon } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import ConfirmModal from './ConfirmModal'
import AvatarGroup from '@/app/components/AvatarGroup'

interface ProfileDrawerProps {
  data: Conversation & { users: User[] }
  isOpen: boolean
  onClose: () => void
}

const ProfileDrawer = ({ data, isOpen, onClose }: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [otherUser.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }

    return 'Online'
  }, [data])

  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-gray-100 py-6 shadow-xl transition-all dark:bg-slate-800">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              className="rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-4 scale-150">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <Text paragraph className="text-xl font-semibold">
                            {title}
                          </Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            {statusText}
                          </Text>
                          <div className="my-8 flex gap-10">
                            <div
                              onClick={() => setIsOpenConfirm(true)}
                              className="flex cursor-pointer flex-col items-center gap-3 text-center text-red-500 transition-all hover:opacity-75"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700">
                                <Trash2Icon size={20} />
                              </div>
                              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Delete conversation
                              </p>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:p-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-slate-900 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 text-sm text-slate-900 dark:text-gray-200 sm:col-span-2">
                                    {data.users
                                      .map((user) => user.email)
                                      .join(', ')}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-slate-900 dark:text-gray-200 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-slate-900 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-slate-900 dark:text-gray-200 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ProfileDrawer
