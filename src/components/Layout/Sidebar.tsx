import { useState, useEffect } from 'react'
import { FileText, Trash2, Clock } from 'lucide-react'
import { storageService } from '@services/storageService'
import { RecentDocument } from '@types'

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
  onDocumentSelect?: (doc: RecentDocument) => void
}

export function Sidebar({ isOpen, onClose, onDocumentSelect }: SidebarProps) {
  const [recentDocs, setRecentDocs] = useState<RecentDocument[]>([])

  useEffect(() => {
    setRecentDocs(storageService.getRecentDocuments())
  }, [])

  const handleDeleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    storageService.deleteDocument(id)
    setRecentDocs(storageService.getRecentDocuments())
  }

  const handleSelectDocument = (doc: RecentDocument) => {
    onDocumentSelect?.(doc)
    onClose?.()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform z-40 overflow-y-auto lg:relative lg:top-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Clock size={16} />
            Recientes
          </h2>
        </div>

        <div className="px-2">
          {recentDocs.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 px-2 py-4">
              No hay documentos recientes
            </p>
          ) : (
            recentDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => handleSelectDocument(doc)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group mb-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {doc.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {doc.date} · {Math.round(doc.size / 1024)} KB
                    </p>
                  </div>
                  <button
                    onClick={e => handleDeleteDocument(doc.id, e)}
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded transition-all flex-shrink-0"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
