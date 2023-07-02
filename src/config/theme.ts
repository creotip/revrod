import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const chakraTheme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        // color: 'gray.600',
        // lineHeight: 'tall',
        fontSize: '15px',
        fontWeight: '400',
      },
      body: {
        bgImage: 'linear-gradient(318deg, #0e1219 6.5%, #2b354d 93.2%)',
      },
    },
  },
})
