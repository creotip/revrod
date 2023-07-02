import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '../hooks/use-debounce'
import { useAtom } from 'jotai'
import { currentLocationAtom, weatherIsSearchByZip } from '@/config/store'
import { useAutocomplete } from '@/hooks/use-autocomplete'
import type { GeoCodeSuggection } from '@/types'
import { getCombinedLocation } from '@/utils'

import { Dropdown } from './dropdown'

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [isZip, setIsZip] = useAtom(weatherIsSearchByZip)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { loading, suggestions, getSuggestions } = useAutocomplete()
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(null)
    const inputValue = e.target.value
    setSearchTerm(inputValue)
  }, [])

  useEffect(() => {
    if (isZip) {
      setSearchTerm('')
      setCurrentLocation(null)
      onClose()
    }
  }, [isZip, onClose, setCurrentLocation])

  useEffect(() => {
    if (debouncedSearchTerm !== '' && !currentLocation) {
      getSuggestions(debouncedSearchTerm)
      onOpen()
    } else {
      onClose()
    }
  }, [debouncedSearchTerm, getSuggestions, onClose, onOpen, currentLocation])

  const handleSelectSuggestion = (lat: number, lon: number, suggestion: string) => {
    setCurrentLocation({
      name: suggestion,
      lat,
      lon,
    })
    setSearchTerm(suggestion)
    onClose()
  }

  return (
    <Flex>
      <Box w="100%">
        <InputGroup>
          <Input
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={`Search weather by ${isZip ? 'zip (numbers only)' : 'city'}`}
            fontSize="md"
            borderRadius="md"
            size="lg"
            borderColor="gray.700"
            fontWeight="600"
          />
          <InputRightElement h="100%">{loading && <Spinner />}</InputRightElement>
        </InputGroup>

        <Box pos="relative">
          {isOpen && !loading && (
            <Dropdown isOpen={isOpen && !loading} onClose={onClose}>
              {!suggestions.length ? (
                <Box p="1rem">Nothing to show</Box>
              ) : (
                suggestions.map(({ name, state, country, lat, lon }: GeoCodeSuggection) => (
                  <Button
                    className="heyyyy"
                    key={crypto.randomUUID()}
                    onClick={() =>
                      handleSelectSuggestion(lat, lon, getCombinedLocation(name, state, country))
                    }
                    minH="48px"
                    borderRadius="none"
                    variant="ghost"
                    justifyContent="flex-start"
                    fontWeight="600"
                    whiteSpace="break-spaces"
                  >
                    {getCombinedLocation(name, state, country)}
                  </Button>
                ))
              )}
            </Dropdown>
          )}
        </Box>
      </Box>

      <Checkbox
        className="zip-checkbox"
        colorScheme="teal"
        mx="5"
        onChange={(e) => setIsZip(e.target.checked)}
      >
        zip
      </Checkbox>
    </Flex>
  )
}
