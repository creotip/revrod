import { Box, Fade } from '@chakra-ui/react'
import { Header } from './components/header'
import { SearchInput } from './components/search-input'
import { WeatherWidget } from './components/weather-widget'
import { useWeather } from './hooks/use-weather'
import { useAtomValue } from 'jotai'
import { currentLocationAtom } from './config/store'
import { useOnLine } from './hooks/use-online'

function App() {
  useOnLine()
  const currentLocation = useAtomValue(currentLocationAtom)
  const { currentWeather } = useWeather(currentLocation)

  return (
    <Box maxW="900px" mx="auto" px="1rem" minH="100vh">
      <Header />
      <Box as="main" mt="3rem">
        <SearchInput />
        <Fade in={!!currentWeather} unmountOnExit>
          {currentWeather && <WeatherWidget {...currentWeather} />}
        </Fade>
      </Box>
    </Box>
  )
}

export default App
