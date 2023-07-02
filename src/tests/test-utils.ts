import { render, cleanup } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'

import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

const renderWithChakra = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: ChakraProvider, ...options })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { renderWithChakra as render }
