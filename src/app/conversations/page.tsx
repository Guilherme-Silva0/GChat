'use client'

import useConversation from '@/hooks/useConversation'
import clsx from 'clsx'
import StateEmpty from '../components/StateEmpty'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('h-full lg:block lg:pl-80', isOpen ? 'block' : 'hidden')}
    >
      <StateEmpty />
    </div>
  )
}

export default Home
