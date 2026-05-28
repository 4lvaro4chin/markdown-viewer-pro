import { useState, useEffect } from 'react'

export function useFontSize() {
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const saved = localStorage.getItem('user:fontSize')
    if (saved) {
      setFontSize(parseInt(saved, 10))
    }
  }, [])

  const increaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.min(prev + 2, 24)
      localStorage.setItem('user:fontSize', newSize.toString())
      return newSize
    })
  }

  const decreaseFontSize = () => {
    setFontSize(prev => {
      const newSize = Math.max(prev - 2, 12)
      localStorage.setItem('user:fontSize', newSize.toString())
      return newSize
    })
  }

  const resetFontSize = () => {
    localStorage.setItem('user:fontSize', '16')
    setFontSize(16)
  }

  return { fontSize, increaseFontSize, decreaseFontSize, resetFontSize }
}
