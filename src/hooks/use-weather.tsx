import type { CurrentLocation, WeatherWidgetProps } from '@/types'
import { apiConfig } from '@/config'
import { useState, useCallback, useEffect } from 'react'
import { useAtom } from 'jotai'
import { weatherCacheAtom } from '@/config/store'
import { useNotification } from './use-notification'

export const useWeather = (location: CurrentLocation | null) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherWidgetProps | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherCache, setWeatherCache] = useAtom(weatherCacheAtom)

  const { notifyNotFound, notifyError } = useNotification()

  const getWeather = useCallback(async () => {
    if (!location) {
      return
    }
    const { apiKey, baseUrl } = apiConfig.openWeatherOneCallApi
    const openWeatherOneCallURL = `${baseUrl}/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`

    if (weatherCache.has(location.name)) {
      setCurrentWeather(weatherCache.get(location.name) || null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const weatherRes = await fetch(openWeatherOneCallURL)
      const { current, daily } = await weatherRes.json()

      if (weatherRes.status === 404) {
        notifyNotFound()
        setError('Not found')
        setCurrentWeather(null)
      } else {
        const weather = {
          locationName: location.name,
          locationLat: current.lat,
          locationLon: current.lon,
          temperature: current.temp,
          weatherCondition: current.weather?.[0]?.main,
          windSpeed: current.wind_speed,
          humidity: current.humidity,
          dailyForecast: daily,
        } satisfies WeatherWidgetProps

        setCurrentWeather(weather)
        setWeatherCache((prevCache) => new Map(prevCache.set(location?.name, weather)))
      }
    } catch (error: any) {
      setError(error?.message)
      setCurrentWeather(null)
      notifyError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [location, notifyError, notifyNotFound, setWeatherCache, weatherCache])

  useEffect(() => {
    if (location) {
      getWeather()
    }
  }, [getWeather, location])

  if (!location) {
    return { currentWeather: null, error: null, loading: false }
  }

  return { currentWeather, error, loading }
}
