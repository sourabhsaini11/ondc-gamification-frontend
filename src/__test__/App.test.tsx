// Imports
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// To Test
import App from '../App'

// Tests
test('Renders main page correctly', async () => {
  // Setup
  render(<App />)
  const buttonCount = await screen.findByRole('button')

  expect(buttonCount.innerHTML).toBe('count is 0')

  /* fire events that update state */
  await act(async () => {
    buttonCount.click()
    buttonCount.click()
  })

  // Post Expectations
  expect(buttonCount.innerHTML).toBe('count is 2')
})
