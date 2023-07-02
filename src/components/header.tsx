import { Box, Grid } from '@chakra-ui/react'
import { UnitsSwitch } from './unit-switch'
export const Header = () => {
  return (
    <Grid as="header" gridAutoFlow="column" placeItems="end" alignItems="center" py="1rem">
      <Box
        pos="relative"
        fontWeight="900"
        fontSize="3xl"
        filter="drop-shadow(0 0 2em #61dafbaa)"
        maxW="max-content"
      >
        <Box
          filter="blur(34px)"
          backgroundImage="linear-gradient( -45deg, #572eab 30%, #906fda )"
          pos="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
        ></Box>
        <Box zIndex="2" pos="relative">
          <Box as="span" color="teal.50">
            Rev
          </Box>
          <Box as="span" color="teal.200">
            Rod
          </Box>
        </Box>
      </Box>

      <Box>
        <UnitsSwitch />
      </Box>
    </Grid>
  )
}
