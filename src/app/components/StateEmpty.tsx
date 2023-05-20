import Image from 'next/image'
import Text from '../../components/Text'

const StateEmpty = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100 px-4 py-10 transition-all dark:bg-slate-800 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/conversation-animate.svg"
          alt="conversation animate image"
          height={400}
          width={400}
        />
        <Text paragraph className="text-2xl font-semibold">
          Start a new conversation!
        </Text>
      </div>
    </div>
  )
}

export default StateEmpty
