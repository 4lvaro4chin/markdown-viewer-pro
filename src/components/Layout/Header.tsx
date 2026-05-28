import { useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { Menu, Sun, Moon, Monitor, Download, Share2, Code, Eye, Columns, ZoomIn, ZoomOut, PanelLeft } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
  onExport?: () => void
  onViewChange?: (view: 'split' | 'editor' | 'preview') => void
  currentView?: 'split' | 'editor' | 'preview'
  hasUnsavedChanges?: boolean
  onToggleSidebar?: () => void
  fontSize?: number
  onFontSizeIncrease?: () => void
  onFontSizeDecrease?: () => void
}

export function Header({
  onMenuClick,
  onExport,
  onViewChange,
  currentView,
  hasUnsavedChanges,
  onToggleSidebar,
  fontSize = 16,
  onFontSizeIncrease,
  onFontSizeDecrease
}: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isThemeOpen, setIsThemeOpen] = useState(false)

  const viewButtons = [
    { value: 'editor' as const, icon: Code, label: 'Editor', title: 'Solo editor' },
    { value: 'preview' as const, icon: Eye, label: 'Preview', title: 'Solo lectura' },
    { value: 'split' as const, icon: Columns, label: 'Split', title: 'Editor + Preview' },
  ]

  const themes = [
    { value: 'light' as const, label: 'Claro', icon: Sun },
    { value: 'dark' as const, label: 'Oscuro', icon: Moon },
    { value: 'auto' as const, label: 'Auto', icon: Monitor },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            📝 Markdown Viewer Pro
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {hasUnsavedChanges && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm rounded">
              ○ Sin guardar
            </div>
          )}

          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden md:block"
              title="Ocultar/mostrar barra lateral"
              aria-label="Barra lateral"
            >
              <PanelLeft size={20} />
            </button>
          )}

          <div className="hidden md:flex gap-1 border-l border-gray-200 dark:border-gray-700 pl-2">
            {onFontSizeDecrease && (
              <button
                onClick={onFontSizeDecrease}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Reducir tamaño"
                aria-label="Reducir"
              >
                <ZoomOut size={20} />
              </button>
            )}
            {fontSize && (
              <div className="px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {fontSize}px
              </div>
            )}
            {onFontSizeIncrease && (
              <button
                onClick={onFontSizeIncrease}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Aumentar tamaño"
                aria-label="Aumentar"
              >
                <ZoomIn size={20} />
              </button>
            )}
          </div>

          {onViewChange && currentView && (
            <div className="hidden sm:flex gap-1 border-l border-gray-200 dark:border-gray-700 pl-2">
              {viewButtons.map(({ value, icon: Icon, title }) => (
                <button
                  key={value}
                  onClick={() => onViewChange(value)}
                  className={`p-2 rounded-lg transition-colors ${
                    currentView === value
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={title}
                  aria-label={title}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' && <Sun size={20} />}
              {theme === 'dark' && <Moon size={20} />}
              {theme === 'auto' && <Monitor size={20} />}
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {themes.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTheme(value)
                      setIsThemeOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      theme === value ? 'bg-blue-50 dark:bg-blue-900 text-blue-600' : ''
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onExport}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block"
            aria-label="Exportar"
            title="Exportar documento"
          >
            <Download size={20} />
          </button>

          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block"
            aria-label="Compartir"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
