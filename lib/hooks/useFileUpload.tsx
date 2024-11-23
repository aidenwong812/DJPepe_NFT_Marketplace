import { useState } from 'react'
import { MAX_FILE_SIZE, ONE_MB } from '@/lib/consts'
import getIpfsJwt from '@/lib/ipfs/getIpfsJwt'
import { uploadFile } from '@/lib/ipfs/uploadFile'

const useFileUpload = () => {
  const [blurImageUrl, setBlurImageUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUri, setImageUri] = useState<string>('')

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setLoading(true)

    try {
      const file = event.target.files?.[0]
      if (!file) throw new Error()
      const JWT = await getIpfsJwt()

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`)
      }
      const mimeType = file.type

      const isImage = mimeType.includes('image')

      const { uri } = await uploadFile(file, JWT)
      if (isImage) {
        setImageUri(uri)
        setBlurImageUrl(URL.createObjectURL(file))
      }
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Failed to upload the file. Please try again.';
      setError(message)
    }
    setLoading(false)
  }

  return {
    fileUpload,
    loading,
    error,
    blurImageUrl,
    imageUri,
  }
}

export default useFileUpload
