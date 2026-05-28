import { useEffect } from 'react'

interface ShortcutHandlers {
  'ctrl+s'?: () => void
  'ctrl+f'?: () => void
  'ctrl+h'?: () => void
  'ctrl+z'?: () => void
  'ctrl+y'?: () => void
  'ctrl+l'?: () => void
  'ctrl+m'?: () => void
  'ctrl+t'?: () => void
  'ctrl+e'?: () => void
  escape?: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const cmdKey = isMac ? e.metaKey : e.ctrlKey
      const key = e.key.toLowerCase()

      if (cmdKey && key === 's') {
        e.preventDefault()
        handlers['ctrl+s']?.()
      } else if (cmdKey && key === 'f') {
        e.preventDefault()
        handlers['ctrl+f']?.()
      } else if (cmdKey && key === 'h') {
        e.preventDefault()
        handlers['ctrl+h']?.()
      } else if (cmdKey && key === 'z') {
        e.preventDefault()
        handlers['ctrl+z']?.()
      } else if (cmdKey && key === 'y') {
        e.preventDefault()
        handlers['ctrl+y']?.()
      } else if (cmdKey && key === 'l') {
        e.preventDefault()
        handlers['ctrl+l']?.()
      } else if (cmdKey && key === 'm') {
        e.preventDefault()
        handlers['ctrl+m']?.()
      } else if (cmdKey && key === 't') {
        e.preventDefault()
        handlers['ctrl+t']?.()
      } else if (cmdKey && key === 'e') {
        e.preventDefault()
        handlers['ctrl+e']?.()
      } else if (key === 'escape') {
        handlers.escape?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
