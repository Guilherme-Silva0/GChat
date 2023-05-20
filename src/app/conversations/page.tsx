'use client'

import useConversation from '@/hooks/useConversation'
import clsx from 'clsx'
import StateEmpty from '../components/StateEmpty'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <StateEmpty />
    </div>
  )
}

export default Home
