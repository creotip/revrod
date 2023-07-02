import type { CurrentLocation, WeatherUnits, WeatherWidgetProps } from '@/types'
import { atom } from 'jotai'

export const currentWeatherAtom = atom<WeatherWidgetProps | null>(null)
export const currentLocationAtom = atom<CurrentLocation | null>(null)

export const weatherCacheAtom = atom<Map<string, WeatherWidgetProps>>(new Map())

export const weatherUnitsAtom = atom<WeatherUnits>('metric')
export const weatherIsSearchByZip = atom<boolean>(false)
