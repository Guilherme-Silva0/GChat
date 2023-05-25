import Modal from '@/components/Modal'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ImageModalProps {
  src?: string | null
  isOpen?: boolean
  onClose: () => void
}

const ImageModal = ({ onClose, isOpen, src }: ImageModalProps) => {
  if (!src) {
    return null
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="relative h-full w-full">
        <Link
          href={src}
          download
          className="absolute left-2 top-2 rounded-full bg-gray-100 p-2 text-slate-900 transition-all hover:scale-90 dark:bg-slate-900 dark:text-gray-200"
        >
          <ArrowDownIcon />
        </Link>
        <Image
          alt="Image"
          height={800}
          width={800}
          src={src}
          className="rounded-md"
        />
      </div>
    </Modal>
  )
}

export default ImageModal
