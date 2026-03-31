import { useEffect, useState } from 'react'

type Theme = 'sunrise' | 'dusk'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('sunrise')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'sunrise' ? 'dusk' : 'sunrise'))
  }

  return { theme, toggleTheme }
}
