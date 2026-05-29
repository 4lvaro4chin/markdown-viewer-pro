import { useState, useEffect, useRef } from 'react'
import { Copy, ChevronRight, ChevronLeft } from 'lucide-react'
import { marked } from 'marked'
import { markdownService } from '@services/markdownService'
import { TableOfContents } from './TableOfContents'
import { TableOfContentsItem } from '@types'

interface PreviewProps {
  content: string
  docName: string
  fontSize?: number
  exportRef?: React.RefObject<HTMLElement>
}

export function Preview({ content, docName, fontSize = 16, exportRef }: PreviewProps) {
  const [toc, setToc] = useState<TableOfContentsItem[]>([])
  const [htmlContent, setHtmlContent] = useState('')
  const [tocVisible, setTocVisible] = useState(true)
  const [tocWidth, setTocWidth] = useState(192)
  const [isDragging, setIsDragging] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user:tocWidth')
    if (saved) {
      setTocWidth(parseInt(saved, 10))
    }
  }, [])

  useEffect(() => {
    const newToc = markdownService.extractTableOfContents(content)
    setToc(newToc)

    try {
      const html = marked(content) as string
      setHtmlContent(html)
    } catch (error) {
      console.error('Error rendering markdown:', error)
    }
  }, [content])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const container = dividerRef.current?.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const newWidth = e.clientX - rect.left

      if (newWidth > 150 && newWidth < 400) {
        setTocWidth(newWidth)
        localStorage.setItem('user:tocWidth', newWidth.toString())
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headings.forEach(heading => {
        if (!heading.id) {
          const id = markdownService.generateHeadingId(heading.textContent || '')
          heading.id = id
        }
      })
    }
  }, [htmlContent])

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (error) {
      console.error('Error copying:', error)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            👁️ Vista previa
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {docName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {toc.length > 0 && (
            <button
              onClick={() => setTocVisible(!tocVisible)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors hidden md:block"
              title={tocVisible ? 'Ocultar tabla de contenidos' : 'Mostrar tabla de contenidos'}
              aria-label="Toggle TOC"
            >
              {tocVisible ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          <button
            onClick={handleCopyHTML}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copiar contenido"
            aria-label="Copiar"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {toc.length > 0 && tocVisible && (
          <>
            <aside style={{ width: `${tocWidth}px` }} className="border-r border-gray-200 dark:border-gray-800 overflow-y-auto hidden md:flex flex-col bg-gray-50 dark:bg-slate-900">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Tabla de contenidos
                </h3>
                <TableOfContents items={toc} />
              </div>
            </aside>
            <div
              ref={dividerRef}
              onMouseDown={() => setIsDragging(true)}
              className="w-1 bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors hidden md:block"
              title="Arrastra para redimensionar"
            />
          </>
        )}

        <div className="flex-1 overflow-y-auto">
          <article
            className="p-6 sm:p-8 max-w-4xl mx-auto"
            style={{ fontSize: `${fontSize}px` }}
            ref={exportRef as React.RefObject<HTMLElement>}
          >
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#B10057' }}>
              {docName}
            </h1>

            <style>{`
              .prose h1 { color: #B10057 !important; font-weight: bold; }
              .prose h2 { color: #F78700 !important; font-weight: bold; }
              .prose h3 { color: #3B3B3B !important; font-weight: bold; }
              .prose h4, .prose h5, .prose h6 { color: #3B3B3B !important; }
              .prose { color: #3B3B3B !important; }
              .prose a { color: #B10057 !important; text-decoration: underline; }
              .prose strong { color: #3B3B3B !important; font-weight: 600; }
              .prose em { color: #F78700 !important; }
              .prose table { border-color: #B10057 !important; }
              .prose table thead { background-color: #B10057 !important; }
              .prose table thead th { color: white !important; border-color: #B10057 !important; }
              .prose table tbody tr:nth-child(odd) { background-color: #F5D0E5 !important; }
              .prose table tbody tr:nth-child(even) { background-color: #F4F4F4 !important; }
              .prose table tbody td { border-color: #E0E0E0 !important; color: #3B3B3B !important; }
              .prose blockquote { border-left-color: #B10057 !important; color: #3B3B3B !important; }
              .prose code { background-color: #F4F4F4 !important; color: #B10057 !important; }
              .prose pre { background-color: #3B3B3B !important; }
              .prose pre code { color: #F78700 !important; }
              .prose hr { border-color: #F78700 !important; }
            `}</style>

            <div
              className="prose max-w-none prose-headings:scroll-mt-20"
            >
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
