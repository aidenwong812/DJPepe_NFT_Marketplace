import { useRef } from 'react'
import Image from 'next/image'
import { Spinner } from '@nextui-org/react'
import { useFileUploadProvider } from '@/provider/FileUploadProvider'
import { cn } from '@/lib/utils'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import NoFileSelected from './NoFileSelected'

const MediaUpload = () => {
  const {
    fileUpload,
    loading,
    error,
    blurImageUrl,
    imageUri,
  } = useFileUploadProvider()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center left-0 top-0">
          <Spinner
            label="Loading..."
            size="lg"
            style={{ color: "#15BFFD", background: "transparent" }}
          />
        </div>
      )
    }

    if (imageUri) {
      return (
        <div className="relative w-[296px] h-[296px]">
          <Image
            src={blurImageUrl || getIpfsLink(imageUri)}
            className="rounded-md cursor-pointer absolute h-[296px] aspect-square object-cover"
            alt="Image Preview"
            onClick={handleImageClick}
            blurDataURL={blurImageUrl}
            layout="fill"
          />
        </div>
      )
    }

    return <NoFileSelected onClick={handleImageClick} />
  }

  return (
    <div className="w-full max-w-3xl flex flex-col justify-center items-center text-white">
      <div
        className={cn(
          'relative rounded-md min-h-[300px] w-[300px]',
          !imageUri && 'aspect-square',
          (loading || !imageUri) && 'border-dashed border-2 border-white',
        )}
      >
        <input
          ref={fileInputRef}
          id="media"
          type="file"
          className="hidden"
          onChange={fileUpload}
          accept="image/*"
        />
        {renderMedia()}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MediaUpload
