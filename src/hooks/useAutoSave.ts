import { useEffect, useRef, useCallback } from 'react'

export function useAutoSave(
  content: string,
  onSave: (content: string) => void,
  intervalMs: number = 10000
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedRef = useRef<string>(content)

  const save = useCallback(() => {
    if (content !== lastSavedRef.current) {
      onSave(content)
      lastSavedRef.current = content
    }
  }, [content, onSave])

  useEffect(() => {
    timeoutRef.current = setInterval(save, intervalMs)

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [save, intervalMs])

  const forceSave = useCallback(() => {
    save()
  }, [save])

  const hasUnsavedChanges = content !== lastSavedRef.current

  return {
    forceSave,
    hasUnsavedChanges,
  }
}
