import Image from 'next/image'
import Text from '../../components/Text'

const StateEmpty = () => {
  return (
    <div className="bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center transition-all dark:bg-slate-800">
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
