# Markdown Viewer Pro 📝

Una aplicación web moderna para visualizar, editar y gestionar archivos Markdown con interfaz intuitiva, responsiva y accesible.

## ✨ Características Principales

### 📤 Upload & Rendering
- Drag-and-drop de archivos `.md` / `.markdown`
- Click para seleccionar archivo
- Preview en tiempo real
- Soporte para archivos hasta 10MB
- Indicador de progreso durante carga

### ✏️ Editor Integrado
- **Monaco Editor** (mismo que VS Code)
- Syntax highlighting para Markdown
- Preview en vivo (split-view)
- Minimap de navegación
- Búsqueda y reemplazo (Ctrl+H)
- Deshacer/rehacer (Ctrl+Z / Ctrl+Y)
- Line numbers y word wrap automático

### 🗂️ Navegación & Estructura
- Table of Contents (TOC) automático en sidebar
- Navegación por encabezados (clickeable)
- Breadcrumb trail
- Búsqueda en el documento (Ctrl+F)
- Jump to heading

### 🎨 Visualización
- Tema claro / oscuro / auto
- Control de tamaño de fuente (10px - 24px)
- Ancho de línea ajustable
- Font family seleccionable (Serif / Sans-serif / Monospace)
- Modo enfoque (focus mode)
- Fullscreen reading

### 💾 Historial & Persistencia
- Auto-save cada 10 segundos
- Historial local (últimos 20 documentos)
- Versiones guardadas (snapshots)
- Restaurar versiones anteriores
- Indicador "unsaved changes"

### 📥 Exportación
- Exportar a PDF (con estilos)
- Exportar a HTML
- Copiar markdown al portapapeles
- Copiar HTML renderizado
- Descargar como .md

### ♿ Accesibilidad & UX
- Atajos de teclado (Cmd/Ctrl combinations)
- ARIA labels en todos los elementos
- Modo alto contraste
- Tipografía legible
- Responsive (mobile + tablet + desktop)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **Monaco Editor**
- **Marked** para renderizado de Markdown
- **Zustand** para state management
- **jsPDF** para exportación a PDF

### Backend
- **Express.js**
- **Multer** para manejo de archivos
- **CORS** para cross-origin requests

## 🚀 Instalación

### Requisitos previos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# Clonar repositorio
git clone <repo-url>
cd markdown-viewer

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar en desarrollo
npm run dev
```

## 📋 Comandos

```bash
# Desarrollo (frontend + backend)
npm run dev

# Build
npm run build

# Preview de la build
npm run preview

# Servidor solo
npm run server

# Lint
npm run lint
```

## 🗂️ Estructura del Proyecto

```
markdown-viewer/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   ├── Preview/
│   │   ├── Layout/
│   │   ├── Upload/
│   │   └── UI/
│   ├── hooks/
│   │   ├── useMarkdown.ts
│   │   ├── useTheme.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useAutoSave.ts
│   ├── services/
│   │   ├── storageService.ts
│   │   ├── markdownService.ts
│   │   ├── exportService.ts
│   │   └── apiService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   └── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+S` / `Cmd+S` | Guardar/descargar |
| `Ctrl+F` | Buscar en documento |
| `Ctrl+H` | Reemplazar |
| `Ctrl+Z` | Deshacer |
| `Ctrl+Y` | Rehacer |
| `Ctrl+L` | Aumentar fuente |
| `Ctrl+M` | Disminuir fuente |
| `Ctrl+T` | Cambiar tema |
| `Ctrl+E` | Toggle editor/preview |
| `Escape` | Cerrar dialogs |

## 📱 Responsiveness

La aplicación está completamente optimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)

## 🔒 Almacenamiento

### LocalStorage (Client)
```json
{
  "markdown:recent": [...],
  "markdown:content:uuid": "...",
  "markdown:versions:uuid": [...],
  "user:theme": "auto|light|dark",
  "user:fontSize": 16,
  "user:fontFamily": "sans|serif|mono"
}
```

## 📦 Dependencias Principales

- `react` - UI library
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - Styling
- `@monaco-editor/react` - Code editor
- `marked` - Markdown parser
- `jspdf` - PDF export
- `zustand` - State management
- `express` - Backend server

## 🎯 MVP vs Extended

### MVP (Fase 1) ✅
- Upload & preview
- Monaco Editor
- TOC + navegación
- Tema claro/oscuro
- Auto-save local
- Exportar PDF/HTML
- Responsive mobile

### Extended (Fase 2) 📅
- Sincronización cloud (Google Drive, Dropbox)
- Colaboración en tiempo real
- Comentarios inline
- Etiquetas y categorías
- Búsqueda global
- Plantillas
- Estadísticas del documento

## 🌐 API Endpoints

```
POST   /api/markdown/render      Renderizar markdown
POST   /api/markdown/upload      Subir archivo
GET    /api/markdown/recent      Últimos archivos
POST   /api/export/pdf           Exportar a PDF
POST   /api/export/html          Exportar a HTML
DELETE /api/history/:id          Borrar del historial
GET    /api/health               Health check
```

## 🔧 Configuración

### Vite
- HMR habilitado en desarrollo
- Proxy a `/api` en localhost:3000
- Assets optimizados en build

### TypeScript
- `strict` mode habilitado
- Path aliases configurados (@/, @components/, etc)

### Tailwind
- Dark mode habilitado
- Colores custom definidos
- Prose plugin para estilos de markdown

## 🚢 Deploy

### Local Production
```bash
npm run build
npm run server
```

Visita http://localhost:3000

### Deploy en Vercel

1. **Conectar repositorio:**
   - Ve a [Vercel](https://vercel.com)
   - Click en "New Project"
   - Selecciona el repositorio `markdown-viewer-pro`

2. **Configuración automática:**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: No necesarias para la demo

3. **Deploy:**
   - Vercel detectará automáticamente la configuración
   - Click en "Deploy"
   - Tu app estará en vivo en ~30 segundos

**Nota:** El backend (Express) se ejecuta junto con el frontend en Vercel usando serverless functions. La configuración está lista en `vite.config.ts`.

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o sugerir features, abre un issue en GitHub.

---

**Hecho con ❤️ para escritores y desarrolladores que aman Markdown**
