import { weatherUnitsAtom } from '@/config/store'
import type { WeatherWidgetProps } from '@/types'
import { celsiusToFahrenheit, formatDate, kmToMiles } from '@/utils'
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
} from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { weatherIconsMap } from './weather-icons-map'
import { WiStrongWind, WiHumidity } from 'react-icons/wi'

export const WeatherWidget = ({
  temperature,
  weatherCondition,
  windSpeed,
  humidity,
  dailyForecast,
}: WeatherWidgetProps) => {
  const unit = useAtomValue(weatherUnitsAtom)
  const isMetric = unit === 'metric'

  const fiveDaysForecast = dailyForecast.slice(1, 6)

  return (
    <Box
      className="weather-widget"
      mt="1rem"
      boxShadow="2xl"
      rounded="md"
      border="1px solid"
      borderColor="gray.700"
      pos="relative"
    >
      <Stack
        display="grid"
        gridAutoFlow={['row', 'row', 'column']}
        gridTemplateColumns={['1fr', '1fr', '1fr auto 2fr']}
        spacing={0}
        direction="row"
        divider={<StackDivider borderColor="gray.700" />}
      >
        <Box p="1.5rem">
          <Center>
            <Tag>Today</Tag>
          </Center>
          <Box
            className="temperature"
            fontSize="4rem"
            fontWeight="200"
            textAlign="center"
            my="1rem"
          >
            {isMetric ? temperature.toFixed() : celsiusToFahrenheit(temperature).toFixed()}°
          </Box>
          <SimpleGrid
            columns={3}
            spacing="1rem"
            color="gray.400"
            fontSize="sm"
            placeItems="center"
            textAlign="center"
          >
            <Box textTransform="capitalize" minW="60px">
              <Icon boxSize={8} as={weatherIconsMap[weatherCondition]} />
              <Box className="weather-condition">{weatherCondition}</Box>
            </Box>
            <Box textTransform="capitalize" minW="60px">
              <Icon boxSize={8} as={WiStrongWind} />
              <Box className="wind-speed">
                {isMetric ? windSpeed.toFixed(1) : kmToMiles(windSpeed).toFixed(1)}
                <Box as="span" fontSize="12px">
                  {isMetric ? 'km/h' : 'mph'}
                </Box>
              </Box>
            </Box>
            <Box textTransform="capitalize" minW="60px">
              <Icon boxSize={8} as={WiHumidity} />
              <Box>
                <span className="humidity">{humidity}</span>%
              </Box>
            </Box>
          </SimpleGrid>
        </Box>

        {fiveDaysForecast?.length ? (
          <SimpleGrid columns={5} gap="1" className="forecast" py="1.5rem" px="6px">
            {fiveDaysForecast.map((day) => (
              <Flex
                className="forecast-item"
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
                key={crypto.randomUUID()}
                textAlign="center"
                gap="1rem"
              >
                <Tag fontSize={['2xs', 'xs']} px={[1, 2]} minH={['4', '6']}>
                  {formatDate(day.dt)}
                </Tag>
                <Box fontSize={['xs', 'sm']}>
                  {isMetric ? day.temp.max.toFixed() : celsiusToFahrenheit(day.temp.max).toFixed()}°
                  /{' '}
                  {isMetric ? day.temp.min.toFixed() : celsiusToFahrenheit(day.temp.min).toFixed()}°
                  {/* {unitsMap[unit]} */}
                </Box>

                <Box textTransform="capitalize" minW="60px">
                  <Icon boxSize={8} as={weatherIconsMap[day.weather[0].main]} />
                  <Box>{day.weather[0].main}</Box>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        ) : (
          <Center px="2rem">
            <Alert status="warning" justifyContent="center" bg="none">
              <AlertIcon />
              No forecast data. Try to refresh the page.
            </Alert>
          </Center>
        )}
      </Stack>
    </Box>
  )
}
