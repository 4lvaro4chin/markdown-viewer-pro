import { marked } from 'marked'
import { TableOfContentsItem } from '@types'

export const markdownService = {
  renderMarkdown(content: string): string {
    try {
      const html = marked(content) as string
      return html
    } catch (error) {
      console.error('Error rendering markdown:', error)
      return '<p>Error rendering markdown</p>'
    }
  },

  extractTableOfContents(content: string): TableOfContentsItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings: TableOfContentsItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const title = match[2].trim()
      const id = this.generateHeadingId(title)

      headings.push({
        id,
        level,
        title,
        children: [],
      })
    }

    return this._buildHierarchy(headings)
  },

  _buildHierarchy(headings: TableOfContentsItem[]): TableOfContentsItem[] {
    const result: TableOfContentsItem[] = []
    const stack: { level: number; item: TableOfContentsItem }[] = []

    headings.forEach(heading => {
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        result.push(heading)
      } else {
        const parent = stack[stack.length - 1].item
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(heading)
      }

      stack.push({ level: heading.level, item: heading })
    })

    return result
  },

  generateHeadingId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  },

  isValidMarkdown(content: string): boolean {
    return typeof content === 'string' && content.length > 0
  },

  getMarkdownStats(content: string) {
    const lines = content.split('\n').length
    const words = content.split(/\s+/).length
    const chars = content.length
    const headings = (content.match(/^#+\s/gm) || []).length
    const codeBlocks = (content.match(/```/g) || []).length / 2

    return {
      lines,
      words,
      chars,
      headings,
      codeBlocks,
    }
  },
}
