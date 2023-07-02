export const unitsMap = {
  metric: '°C',
  imperial: '°F',
} as const

export const getCombinedLocation = (name: string, state: string, country: string) => {
  const parts = [name, state, country].filter(Boolean)
  return parts.join(', ')
}

export const celsiusToFahrenheit = (celsius: number): number => {
  const fahrenheit = (celsius * 9) / 5 + 32
  return fahrenheit
}

export const kmToMiles = (kilometers: number): number => {
  const miles = kilometers * 0.621371
  return miles
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate().toString().padStart(2, '0')

  return `${dayOfWeek} ${dayOfMonth}`
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
