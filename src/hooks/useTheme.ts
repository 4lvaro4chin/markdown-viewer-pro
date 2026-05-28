import { useState, useEffect } from 'react'

type ThemeType = 'light' | 'dark' | 'auto'

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('user:theme') as ThemeType | null
    return saved || 'auto'
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    localStorage.setItem('user:theme', theme)

    if (theme === 'auto') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
      document.documentElement.classList.toggle('dark', isDarkMode)
    } else {
      const shouldBeDark = theme === 'dark'
      setIsDark(shouldBeDark)
      document.documentElement.classList.toggle('dark', shouldBeDark)
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        setIsDark(e.matches)
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme])

  return {
    theme,
    setTheme,
    isDark,
  }
}
