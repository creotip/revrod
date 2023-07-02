import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useNotification = () => {
  const toast = useToast({
    position: 'top-right',
    duration: 5000,
    isClosable: true,
  })

  const notifyNotFound = useCallback(() => {
    toast({
      title: 'Not Found',
      status: 'error',
    })
  }, [])

  const notifyOnline = useCallback(() => {
    toast({
      title: 'You are online',
      status: 'success',
    })
  }, [])

  const notifyOffline = useCallback(() => {
    toast({
      title: 'You are offline',
      status: 'error',
    })
  }, [])

  const notifyError = useCallback((message: string) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
    })
  }, [])

  return {
    notifyNotFound,
    notifyOnline,
    notifyOffline,
    notifyError,
  }
}
