import { useRef } from 'react'
import { Upload, FileText, Plus } from 'lucide-react'

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void
  onNewDocument: () => void
}

export function FileUploadZone({ onFileUpload, onNewDocument }: FileUploadZoneProps) {
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20')
    }

    const files = Array.from(e.dataTransfer.files)
    const mdFiles = files.filter(file =>
      file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.type === 'text/markdown'
    )

    if (mdFiles.length > 0) {
      onFileUpload(mdFiles[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 sm:p-12 bg-gray-50 dark:bg-slate-900 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,text/markdown"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Subir archivo Markdown"
        />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Upload size={32} className="text-blue-600 dark:text-blue-300" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Importa tu Markdown
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Arrastra un archivo .md aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Soporta archivos hasta 10MB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={e => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <FileText size={18} />
              Seleccionar archivo
            </button>

            <button
              onClick={e => {
                e.stopPropagation()
                onNewDocument()
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
            >
              <Plus size={18} />
              Nuevo documento
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Características
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Vista previa en tiempo real
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Editor integrado (Monaco)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Tabla de contenidos automática
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Auto-guardado
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Exportar a PDF/HTML
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
            Tema claro/oscuro
          </li>
        </ul>
      </div>
    </div>
  )
}
