import { useState, useCallback } from 'react'
import { MarkdownDocument, DocumentVersion } from '@types'

const STORAGE_PREFIX = 'markdown:'

export function useMarkdown() {
  const [content, setContent] = useState('')
  const [versions, setVersions] = useState<DocumentVersion[]>([])

  const saveDocument = useCallback((id: string, name: string, markdownContent: string) => {
    const doc: MarkdownDocument = {
      id,
      name,
      content: markdownContent,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      size: new Blob([markdownContent]).size,
    }

    localStorage.setItem(`${STORAGE_PREFIX}content:${id}`, markdownContent)

    const recent = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}recent`) || '[]')
    const index = recent.findIndex((d: any) => d.id === id)

    if (index > -1) {
      recent[index] = {
        id,
        name,
        date: new Date().toISOString().split('T')[0],
        size: doc.size,
      }
    } else {
      recent.unshift({
        id,
        name,
        date: new Date().toISOString().split('T')[0],
        size: doc.size,
      })
    }

    localStorage.setItem(`${STORAGE_PREFIX}recent`, JSON.stringify(recent.slice(0, 20)))
  }, [])

  const addVersion = useCallback((documentId: string, markdownContent: string, changeType: 'created' | 'edited' | 'exported' = 'edited') => {
    const version: DocumentVersion = {
      id: `v_${Date.now()}`,
      documentId,
      content: markdownContent,
      timestamp: Date.now(),
      changeType,
    }

    const docVersions = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}versions:${documentId}`) || '[]')
    docVersions.push(version)
    localStorage.setItem(`${STORAGE_PREFIX}versions:${documentId}`, JSON.stringify(docVersions.slice(-20)))

    setVersions(docVersions)
  }, [])

  const getRecentDocuments = useCallback(() => {
    const recent = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}recent`) || '[]')
    return recent
  }, [])

  const loadDocument = useCallback((id: string) => {
    const content = localStorage.getItem(`${STORAGE_PREFIX}content:${id}`) || ''
    setContent(content)
    return content
  }, [])

  const deleteDocument = useCallback((id: string) => {
    localStorage.removeItem(`${STORAGE_PREFIX}content:${id}`)
    localStorage.removeItem(`${STORAGE_PREFIX}versions:${id}`)

    const recent = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}recent`) || '[]')
    const filtered = recent.filter((d: any) => d.id !== id)
    localStorage.setItem(`${STORAGE_PREFIX}recent`, JSON.stringify(filtered))
  }, [])

  const getVersions = useCallback((documentId: string) => {
    const versions = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}versions:${documentId}`) || '[]')
    return versions as DocumentVersion[]
  }, [])

  const restoreVersion = useCallback((documentId: string, versionId: string) => {
    const versions = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}versions:${documentId}`) || '[]')
    const version = versions.find((v: DocumentVersion) => v.id === versionId)

    if (version) {
      setContent(version.content)
      saveDocument(documentId, '', version.content)
      return version.content
    }
    return null
  }, [saveDocument])

  return {
    content,
    setContent,
    saveDocument,
    addVersion,
    getRecentDocuments,
    loadDocument,
    deleteDocument,
    versions,
    getVersions,
    restoreVersion,
  }
}
