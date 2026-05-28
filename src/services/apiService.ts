import axios, { AxiosInstance } from 'axios'

const API_BASE = '/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  async renderMarkdown(content: string): Promise<string> {
    try {
      const response = await api.post('/markdown/render', { content })
      return response.data.html
    } catch (error) {
      console.error('Error rendering markdown:', error)
      throw error
    }
  },

  async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post('/markdown/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  },

  async getRecentDocuments(): Promise<any[]> {
    try {
      const response = await api.get('/markdown/recent')
      return response.data
    } catch (error) {
      console.error('Error fetching recent documents:', error)
      return []
    }
  },

  async exportToPDF(content: string, filename: string): Promise<Blob> {
    try {
      const response = await api.post(
        '/export/pdf',
        { content, filename },
        { responseType: 'blob' }
      )
      return response.data
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      throw error
    }
  },

  async exportToHTML(content: string, filename: string): Promise<Blob> {
    try {
      const response = await api.post(
        '/export/html',
        { content, filename },
        { responseType: 'blob' }
      )
      return response.data
    } catch (error) {
      console.error('Error exporting to HTML:', error)
      throw error
    }
  },

  async deleteHistory(id: string): Promise<void> {
    try {
      await api.delete(`/history/${id}`)
    } catch (error) {
      console.error('Error deleting history:', error)
      throw error
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await api.get('/health')
      return response.status === 200
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  },
}
