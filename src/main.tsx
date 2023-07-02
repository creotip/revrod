import '@fontsource/inter/latin-200.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-900.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import App from './App.tsx'
import { chakraTheme } from './config/theme.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
