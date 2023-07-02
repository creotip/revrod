import { apiConfig } from '@/config'
import { weatherIsSearchByZip } from '@/config/store'
import { useState, useCallback } from 'react'
import { useAtomValue } from 'jotai'
import { useNotification } from './use-notification'

const LIMIT = 5

export const useAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isZip = useAtomValue(weatherIsSearchByZip)
  const { notifyNotFound } = useNotification()

  const getSuggestions = useCallback(
    async (query: string) => {
      const { apiKey, baseUrl } = apiConfig.openWeatherGeoCodeApi
      let apiURL = ''
      if (isZip) {
        apiURL = `${baseUrl}/zip?zip=${query}&limit=${LIMIT}&appid=${apiKey}`
      } else {
        apiURL = `${baseUrl}/direct?q=${query}&limit=${LIMIT}&appid=${apiKey}`
      }

      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiURL)
        const data = await response.json()

        if (data.cod === '404' || data.cod === '400') {
          notifyNotFound()
          setError(data.message)
          setSuggestions([])
        } else {
          setSuggestions(isZip ? [data] : data)
        }
      } catch (error: any) {
        setError(error?.message)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [isZip, notifyNotFound]
  )

  return {
    error,
    loading,
    suggestions,
    getSuggestions,
  }
}
