import { useState, useRef } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Editor } from '@components/Editor/Editor'
import { Preview } from '@components/Preview/Preview'
import { FileUploadZone } from '@components/Upload/FileUploadZone'
import { useAutoSave } from '@hooks/useAutoSave'
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts'
import { useFontSize } from '@hooks/useFontSize'
import { storageService } from '@services/storageService'
import { exportService } from '@services/exportService'
import { markdownService } from '@services/markdownService'
import { MarkdownDocument, RecentDocument } from '@types'

function generateId() {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

interface MainLayoutProps {
  currentDoc: MarkdownDocument | null
  content: string
  onDocumentChange: (doc: MarkdownDocument) => void
  onContentChange: (content: string) => void
  onSaveDocument: (id: string, name: string, content: string) => void
}

export function MainLayout({
  currentDoc,
  content,
  onDocumentChange,
  onContentChange,
  onSaveDocument,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [view, setView] = useState<'split' | 'editor' | 'preview'>('preview')
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize()
  const previewContentRef = useRef<HTMLElement>(null)
  const { forceSave, hasUnsavedChanges } = useAutoSave(
    content,
    (newContent) => {
      if (currentDoc) {
        onSaveDocument(currentDoc.id, currentDoc.name, newContent)
      }
    },
    10000
  )

  const handleFileUpload = async (file: File) => {
    const content = await file.text()
    const id = generateId()
    const name = file.name

    const doc = storageService.saveDocument(id, name, content)
    storageService.addVersion(id, content, 'created')

    onDocumentChange(doc)
    onContentChange(content)
    setSidebarOpen(false)
  }

  const handleNewDocument = () => {
    const id = generateId()
    const name = `Documento ${new Date().toLocaleDateString()}`
    const doc = storageService.saveDocument(id, name, '')

    onDocumentChange(doc)
    onContentChange('')
    setSidebarOpen(false)
  }

  const handleSelectDocument = (doc: RecentDocument) => {
    const content = storageService.getContent(doc.id)
    const fullDoc = storageService.loadDocument(doc.id)

    if (fullDoc) {
      onDocumentChange(fullDoc)
      onContentChange(content)
    }
  }

  const handleExport = async () => {
    if (!currentDoc) return

    const filename = currentDoc.name.replace(/\.md$/, '')

    try {
      await exportService.exportToPDF(
        content,
        `${filename}.pdf`,
        undefined,
        previewContentRef.current || undefined
      )
    } catch (error) {
      console.error('Error al exportar:', error)
    }
  }

  useKeyboardShortcuts({
    'ctrl+s': () => {
      forceSave()
    },
    'ctrl+e': () => {
      const views = ['split', 'editor', 'preview']
      const currentIndex = views.indexOf(view)
      setView(views[(currentIndex + 1) % views.length] as any)
    },
  })

  if (!currentDoc) {
    return (
      <div className="h-screen flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onViewChange={setView}
          currentView={view}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          fontSize={fontSize}
          onFontSizeIncrease={increaseFontSize}
          onFontSizeDecrease={decreaseFontSize}
        />
        <div className="flex flex-1">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onDocumentSelect={handleSelectDocument}
            onNewDocument={handleNewDocument}
          />

          <main className="flex-1 flex items-center justify-center p-4">
            <FileUploadZone onFileUpload={handleFileUpload} onNewDocument={handleNewDocument} />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onExport={handleExport}
        onViewChange={setView}
        currentView={view}
        hasUnsavedChanges={hasUnsavedChanges}
        onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        fontSize={fontSize}
        onFontSizeIncrease={increaseFontSize}
        onFontSizeDecrease={decreaseFontSize}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarVisible && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onDocumentSelect={handleSelectDocument}
            onNewDocument={handleNewDocument}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Editor y Preview */}
          <div className="flex-1 flex gap-0 overflow-hidden">
            {(view === 'split' || view === 'editor') && (
              <div className={view === 'split' ? 'flex-1 overflow-hidden' : 'w-full overflow-hidden'}>
                <Editor
                  content={content}
                  onChange={onContentChange}
                  docName={currentDoc.name}
                />
              </div>
            )}

            {(view === 'split' || view === 'preview') && (
              <div className={view === 'split' ? 'flex-1 overflow-hidden border-l border-gray-200 dark:border-gray-800' : 'w-full overflow-hidden'}>
                <Preview content={content} docName={currentDoc.name} fontSize={fontSize} exportRef={previewContentRef} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
