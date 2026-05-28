import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { TableOfContentsItem } from '@types/index'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="text-sm">
      <ul className="space-y-1">
        {items.map(item => (
          <TableOfContentsNode key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  )
}

interface TableOfContentsNodeProps {
  item: TableOfContentsItem
}

function TableOfContentsNode({ item }: TableOfContentsNodeProps) {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    const element = document.getElementById(item.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <li>
      <div className="flex items-center gap-1">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <ChevronDown
              size={16}
              className={`transform transition-transform ${isOpen ? '' : '-rotate-90'}`}
            />
          </button>
        )}

        <button
          onClick={handleClick}
          className="flex-1 text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors truncate"
          title={item.title}
        >
          {item.title}
        </button>
      </div>

      {isOpen && hasChildren && (
        <ul className="ml-4 mt-1 space-y-1 border-l border-gray-300 dark:border-gray-600 pl-2">
          {item.children!.map((child: TableOfContentsItem) => (
            <TableOfContentsNode key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  )
}
