export const apiConfig = {
  openWeatherOneCallApi: {
    baseUrl: 'https://openweathermap.org/data/2.5',
    apiKey: import.meta.env.VITE_OPEN_WEATHER_ONE_CALL_API_KEY,
  },
  openWeatherGeoCodeApi: {
    baseUrl: 'https://api.openweathermap.org/geo/1.0',
    apiKey: import.meta.env.VITE_OPEN_WEATHER_GEOCODE_API_KEY,
  },
} as const
