import Modal from '@/components/Modal'
import Image from 'next/image'

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
      <div className="h-80 w-80">
        <Image alt="Image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  )
}

export default ImageModal
