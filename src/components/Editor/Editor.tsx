import { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { EditorToolbar } from './EditorToolbar'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  docName: string
}

export function Editor({ content, onChange, docName }: EditorProps) {
  const editorRef = useRef(null)

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-950">
      <EditorToolbar docName={docName} />

      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          ref={editorRef}
          language="markdown"
          value={content}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            wordWrap: 'on',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            tabSize: 2,
            insertSpaces: true,
          }}
        />
      </div>
    </div>
  )
}
