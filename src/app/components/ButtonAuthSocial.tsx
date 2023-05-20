import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { FunctionComponent, MouseEventHandler } from 'react'

interface ButtonAuthSocialProps {
  icon: LucideIcon | 'google'
  onClick: MouseEventHandler<HTMLButtonElement>
  media: 'google' | 'github'
}

const ButtonAuthSocial: FunctionComponent<ButtonAuthSocialProps> = ({
  icon: Icon,
  onClick,
  media,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-1 items-center justify-center gap-2 rounded py-2 capitalize text-gray-200 focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-95',
        media === 'github' && 'bg-zinc-900',
        media === 'google' && 'bg-red-400',
      )}
    >
      {Icon === 'google' ? (
        <Image
          alt="google icon"
          src="/google.svg"
          width={25}
          height={25}
          className="drop-shadow"
        />
      ) : (
        <Icon className="drop-shadow" />
      )}
      {media}
    </button>
  )
}

export default ButtonAuthSocial
