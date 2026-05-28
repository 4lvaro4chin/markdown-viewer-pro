import { useState, useEffect } from 'react'
import { MainLayout } from '@components/Layout/MainLayout'
import { useMarkdown } from '@hooks/useMarkdown'
import { useTheme } from '@hooks/useTheme'
import { MarkdownDocument } from '@types/index'

function App() {
  const [currentDoc, setCurrentDoc] = useState<MarkdownDocument | null>(null)
  const { theme } = useTheme()
  const { content, setContent, saveDocument } = useMarkdown()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleDocumentChange = (doc: MarkdownDocument) => {
    setCurrentDoc(doc)
    setContent(doc.content)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    if (currentDoc) {
      saveDocument(currentDoc.id, currentDoc.name, newContent)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <MainLayout
        currentDoc={currentDoc}
        content={content}
        onDocumentChange={handleDocumentChange}
        onContentChange={handleContentChange}
        onSaveDocument={saveDocument}
      />
    </div>
  )
}

export default App
