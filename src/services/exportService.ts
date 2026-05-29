import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportService = {
  async exportToPDF(content: string, filename: string, htmlContent?: string, previewElement?: HTMLElement): Promise<void> {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15

      if (previewElement) {
        const canvas = await html2canvas(previewElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true,
          logging: false,
        })

        const imgWidth = pageWidth - margin * 2
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const availableHeight = pageHeight - margin * 2

        let currentY = 0
        let pageCount = 0

        while (currentY < imgHeight) {
          if (pageCount > 0) {
            pdf.addPage()
          }

          const sourceY = currentY * canvas.width / imgWidth
          const sourceHeight = Math.min(availableHeight * canvas.width / imgWidth, canvas.height - sourceY)
          const printHeight = sourceHeight * imgWidth / canvas.width

          const croppedCanvas = document.createElement('canvas')
          croppedCanvas.width = canvas.width
          croppedCanvas.height = sourceHeight

          const ctx = croppedCanvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight)
          }

          const croppedImgData = croppedCanvas.toDataURL('image/png')
          pdf.addImage(croppedImgData, 'PNG', margin, margin, imgWidth, printHeight)

          currentY += availableHeight
          pageCount++
        }
      } else if (htmlContent) {
        const element = document.createElement('div')
        element.innerHTML = htmlContent
        element.style.position = 'fixed'
        element.style.left = '-9999px'
        element.style.top = '-9999px'
        element.style.background = '#ffffff'
        element.style.padding = '2rem'
        element.style.maxWidth = '900px'

        document.body.appendChild(element)

        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true,
          logging: false,
        })

        document.body.removeChild(element)

        const imgWidth = pageWidth - margin * 2
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        let position = margin

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, Math.min(imgHeight, pageHeight - margin * 2))
        heightLeft -= pageHeight - margin * 2

        while (heightLeft > 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight)
          heightLeft -= pageHeight - margin * 2
        }
      } else {
        const maxWidth = pageWidth - margin * 2
        const lines = content.split('\n')
        let yPosition = margin

        lines.forEach(line => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
          }

          pdf.text(line, margin, yPosition, { maxWidth })
          yPosition += 5
        })
      }

      pdf.save(filename)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      throw error
    }
  },

  exportToHTML(_: string, htmlContent: string, filename: string): void {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>
  <style>
    body {
      font-family: 'Inter', system-ui, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background-color: #f9fafb;
    }
    code {
      background-color: #f3f4f6;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Fira Code', monospace;
    }
    pre {
      background-color: #1f2937;
      color: #f3f4f6;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }
    a {
      color: #2563eb;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    blockquote {
      border-left: 4px solid #2563eb;
      padding-left: 1rem;
      margin-left: 0;
      color: #666;
      font-style: italic;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 0.75rem;
      text-align: left;
    }
    th {
      background-color: #f3f4f6;
      font-weight: 600;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
    `

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },

  exportToMarkdown(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },

  copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
  },

  async copyHTMLToClipboard(htmlContent: string): Promise<void> {
    try {
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const data = [new ClipboardItem({ 'text/html': blob })]
      await navigator.clipboard.write(data)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      await this.copyToClipboard(htmlContent)
    }
  },
}
