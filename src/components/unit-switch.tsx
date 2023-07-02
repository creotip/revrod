import { weatherUnitsAtom } from '@/config/store'
import { unitsMap } from '@/utils'
import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { useAtom } from 'jotai'

export const UnitsSwitch = () => {
  const [unit, setUnit] = useAtom(weatherUnitsAtom)

  const handleToggle = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'))
  }
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="scale" mb="0" fontSize="sm" textTransform="capitalize" minW="14px" mr="1">
        {unitsMap[unit]}
      </FormLabel>
      <Switch id="scale" size="sm" colorScheme="teal" onChange={handleToggle} />
    </FormControl>
  )
}
