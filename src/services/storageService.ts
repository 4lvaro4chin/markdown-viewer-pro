import { MarkdownDocument, RecentDocument, DocumentVersion } from '@types/index'

const PREFIX = 'markdown:'

export const storageService = {
  saveDocument(id: string, name: string, content: string): MarkdownDocument {
    const doc: MarkdownDocument = {
      id,
      name,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      size: new Blob([content]).size,
    }

    localStorage.setItem(`${PREFIX}content:${id}`, content)
    localStorage.setItem(`${PREFIX}metadata:${id}`, JSON.stringify(doc))

    const recent: RecentDocument[] = this.getRecentDocuments()
    const index = recent.findIndex(d => d.id === id)

    if (index > -1) {
      recent[index] = {
        id,
        name,
        date: new Date().toISOString().split('T')[0],
        size: doc.size,
      }
      recent.unshift(...recent.splice(index, 1))
    } else {
      recent.unshift({
        id,
        name,
        date: new Date().toISOString().split('T')[0],
        size: doc.size,
      })
    }

    localStorage.setItem(`${PREFIX}recent`, JSON.stringify(recent.slice(0, 20)))
    return doc
  },

  loadDocument(id: string): MarkdownDocument | null {
    const content = localStorage.getItem(`${PREFIX}content:${id}`)
    const metadata = localStorage.getItem(`${PREFIX}metadata:${id}`)

    if (!content || !metadata) return null

    return JSON.parse(metadata)
  },

  getContent(id: string): string {
    return localStorage.getItem(`${PREFIX}content:${id}`) || ''
  },

  getRecentDocuments(): RecentDocument[] {
    const recent = localStorage.getItem(`${PREFIX}recent`)
    return recent ? JSON.parse(recent) : []
  },

  deleteDocument(id: string): void {
    localStorage.removeItem(`${PREFIX}content:${id}`)
    localStorage.removeItem(`${PREFIX}metadata:${id}`)
    localStorage.removeItem(`${PREFIX}versions:${id}`)

    const recent = this.getRecentDocuments()
    const filtered = recent.filter(d => d.id !== id)
    localStorage.setItem(`${PREFIX}recent`, JSON.stringify(filtered))
  },

  addVersion(documentId: string, content: string, changeType: 'created' | 'edited' | 'exported' = 'edited'): DocumentVersion {
    const version: DocumentVersion = {
      id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      documentId,
      content,
      timestamp: Date.now(),
      changeType,
    }

    const versions = this.getVersions(documentId)
    versions.push(version)
    localStorage.setItem(`${PREFIX}versions:${documentId}`, JSON.stringify(versions.slice(-20)))

    return version
  },

  getVersions(documentId: string): DocumentVersion[] {
    const versions = localStorage.getItem(`${PREFIX}versions:${documentId}`)
    return versions ? JSON.parse(versions) : []
  },

  restoreVersion(documentId: string, versionId: string): string | null {
    const versions = this.getVersions(documentId)
    const version = versions.find(v => v.id === versionId)

    if (version) {
      const doc = this.loadDocument(documentId)
      if (doc) {
        this.saveDocument(documentId, doc.name, version.content)
      }
      return version.content
    }
    return null
  },

  clearAllData(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  },
}
