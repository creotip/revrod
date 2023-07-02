import { render, screen } from './test-utils'
import { useOnLine } from '../hooks/use-online'

const TestComponent = () => {
  const status = useOnLine()
  return <div>{status ? 'Online' : 'Offline'}</div>
}

describe('useOnLine', () => {
  test('shows online status', () => {
    // Mock window.navigator.onLine to always return true
    Object.defineProperty(window.navigator, 'onLine', {
      get: () => true,
      configurable: true,
    })

    render(<TestComponent />)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  test('shows offline status', () => {
    // Mock window.navigator.onLine to always return true
    Object.defineProperty(window.navigator, 'onLine', {
      get: () => false,
      configurable: true,
    })

    render(<TestComponent />)
    expect(screen.getByText('Offline')).toBeInTheDocument()
  })
})
