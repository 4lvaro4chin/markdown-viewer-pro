import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../dist')))

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Routes

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Render markdown
app.post('/api/markdown/render', (req: Request, res: Response) => {
  try {
    const { content } = req.body

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required' })
    }

    const html = marked(content) as string
    res.json({ html })
  } catch (error) {
    console.error('Error rendering markdown:', error)
    res.status(500).json({ error: 'Error rendering markdown' })
  }
})

// File upload
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/markdown' || file.mimetype === 'text/plain' ||
        file.originalname.endsWith('.md') || file.originalname.endsWith('.markdown')) {
      cb(null, true)
    } else {
      cb(new Error('Only markdown files are allowed'))
    }
  },
})

app.post('/api/markdown/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const content = req.file.buffer.toString('utf-8')
    res.json({
      success: true,
      filename: req.file.originalname,
      size: req.file.size,
      content,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).json({ error: 'Error uploading file' })
  }
})

// Get recent documents (stub)
app.get('/api/markdown/recent', (req: Request, res: Response) => {
  res.json([])
})

// Export to PDF (stub)
app.post('/api/export/pdf', (req: Request, res: Response) => {
  try {
    const { content, filename } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.pdf'}"`)
    res.send(Buffer.from('PDF generation would happen here'))
  } catch (error) {
    console.error('Error exporting PDF:', error)
    res.status(500).json({ error: 'Error exporting PDF' })
  }
})

// Export to HTML
app.post('/api/export/html', (req: Request, res: Response) => {
  try {
    const { content, filename } = req.body

    if (!content) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const renderedContent = marked(content) as string
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${filename}</title>
</head>
<body>
  ${renderedContent}
</body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.html'}"`)
    res.send(html)
  } catch (error) {
    console.error('Error exporting HTML:', error)
    res.status(500).json({ error: 'Error exporting HTML' })
  }
})

// Delete history
app.delete('/api/history/:id', (req: Request, res: Response) => {
  res.json({ success: true })
})

// Fallback for SPA routing
app.get(/^\/(?!api).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
  console.log(`📝 Markdown Viewer Pro started`)
})
