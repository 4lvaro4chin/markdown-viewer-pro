export interface MarkdownDocument {
  id: string
  name: string
  content: string
  createdAt: number
  updatedAt: number
  size: number
}

export interface DocumentVersion {
  id: string
  documentId: string
  content: string
  timestamp: number
  changeType: 'created' | 'edited' | 'exported'
}

export interface RecentDocument {
  id: string
  name: string
  date: string
  size: number
  content?: string
}

export interface EditorSettings {
  theme: 'light' | 'dark' | 'auto'
  fontSize: number
  fontFamily: 'sans' | 'serif' | 'mono'
  lineWidth: number
  highContrast: boolean
  focusMode: boolean
  wordWrap: boolean
}

export interface TableOfContentsItem {
  id: string
  level: number
  title: string
  children?: TableOfContentsItem[]
}

export interface ExportOptions {
  format: 'pdf' | 'html' | 'md'
  filename: string
  includeStyles?: boolean
}
