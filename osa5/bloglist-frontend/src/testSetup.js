import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Puhdistetaan DOM jokaisen testin jälkeen
afterEach(() => {
  cleanup()
})
