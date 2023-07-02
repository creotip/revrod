import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNotification } from './use-notification'

const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true

export const useOnLine = () => {
  const [status, setStatus] = useState(getOnLineStatus())
  const [isReconnected, setIsReconnected] = useState(false)
  const toast = useToast()
  const { notifyOffline, notifyOnline } = useNotification()

  const setOnline = () => {
    setStatus(true)
    setIsReconnected(true)
  }

  const setOffline = () => setStatus(false)

  useEffect(() => {
    if (!status && !isReconnected) {
      notifyOffline()
    } else if (isReconnected) {
      notifyOnline()
    }
  }, [status, isReconnected, toast, notifyOffline, notifyOnline])

  useEffect(() => {
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  return status
}
