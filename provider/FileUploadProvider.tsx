'use client'

import useFileUpload from '@/lib/hooks/useFileUpload'
import React, { createContext, useContext, useMemo } from 'react'

const FileUploadContext = createContext<ReturnType<typeof useFileUpload>>(
  {} as ReturnType<typeof useFileUpload>,
)

const FileUploadProvider = ({ children }: { children: React.ReactNode }) => {
  const fileUpload = useFileUpload()

  const value = useMemo(() => ({ ...fileUpload }), [fileUpload])

  return <FileUploadContext.Provider value={value}>{children}</FileUploadContext.Provider>
}

const useFileUploadProvider = () => {
  const context = useContext(FileUploadContext)
  if (!context) {
    throw new Error('useFileUploadProvider must be used within a FileUploadProvider')
  }
  return context
}

export { FileUploadProvider, useFileUploadProvider }
