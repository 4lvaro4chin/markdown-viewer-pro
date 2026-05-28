import { Copy, Zap } from 'lucide-react'

interface EditorToolbarProps {
  docName: string
}

export function EditorToolbar({ docName }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          📝 Editor
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {docName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          title="Copiar contenido"
          aria-label="Copiar"
        >
          <Copy size={16} />
        </button>

        <button
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          title="Formatear código"
          aria-label="Formatear"
        >
          <Zap size={16} />
        </button>
      </div>
    </div>
  )
}
