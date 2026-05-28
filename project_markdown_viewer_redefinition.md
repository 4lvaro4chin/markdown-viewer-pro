---
name: project_markdown_viewer_redefinition
description: Complete project specification for Markdown Viewer with modern UX/UI framework (React + Tailwind + shadcn/ui)
metadata: 
  node_type: memory
  type: project
  originSessionId: 8a1bd663-4198-4a66-bec1-5a282da8943c
---

# Markdown Viewer Pro - Especificación Completa

## 📋 Visión General

Aplicación web moderna para visualizar, editar y gestionar archivos Markdown con una interfaz intuitiva, responsiva y accesible. Diseñada para profesionales que necesitan leer y editar documentación rápidamente.

**Stack tecnológico:**
- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Editor:** Monaco Editor (VS Code's editor)
- **Backend:** Express.js
- **Storage:** localStorage (client) + optional SQLite/MongoDB

---

## 🎯 Características Principales

### 1. Upload & Rendering
- ✅ Drag-and-drop de archivos `.md` / `.markdown`
- ✅ Click para seleccionar archivo
- ✅ Preview en tiempo real
- ✅ Soporte para archivos hasta 10MB
- ✅ Indicador de progreso durante carga

### 2. Editor Integrado
- ✅ Monaco Editor (mismo que VS Code)
- ✅ Syntax highlighting para Markdown
- ✅ Preview en vivo (split-view)
- ✅ Minimap de navegación
- ✅ Búsqueda y reemplazo (Ctrl+H)
- ✅ Deshacer/rehacer (Ctrl+Z / Ctrl+Y)
- ✅ Line numbers y word wrap automático

### 3. Navegación & Estructura
- ✅ Table of Contents (TOC) automático en sidebar
- ✅ Navegación por encabezados (clickeable)
- ✅ Breadcrumb trail
- ✅ Búsqueda en el documento (Ctrl+F)
- ✅ Jump to heading

### 4. Visualización
- ✅ Tema claro / oscuro / auto
- ✅ Control de tamaño de fuente (10px - 24px)
- ✅ Ancho de línea ajustable
- ✅ Font family seleccionable (Serif / Sans-serif / Monospace)
- ✅ Modo enfoque (focus mode)
- ✅ Fullscreen reading

### 5. Historial & Persistencia
- ✅ Auto-save cada 10 segundos
- ✅ Historial local (últimos 20 documentos)
- ✅ Versiones guardadas (snapshots)
- ✅ Restaurar versiones anteriores
- ✅ Indicador "unsaved changes"

### 6. Exportación
- ✅ Exportar a PDF (con estilos)
- ✅ Exportar a HTML
- ✅ Copiar markdown al portapapeles
- ✅ Copiar HTML renderizado
- ✅ Descargar como .md

### 7. Accesibilidad & UX
- ✅ Atajos de teclado (Cmd/Ctrl combinations)
- ✅ ARIA labels en todos los elementos
- ✅ Modo alto contraste
- ✅ Tipografía legible
- ✅ Responsive (mobile + tablet + desktop)

---

## 🏗️ Arquitectura

### Frontend Structure
```
src/
├── components/
│   ├── Editor/
│   │   ├── MonacoEditor.tsx
│   │   ├── EditorToolbar.tsx
│   │   └── EditorSettings.tsx
│   ├── Preview/
│   │   ├── MarkdownPreview.tsx
│   │   ├── TableOfContents.tsx
│   │   └── Breadcrumb.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   ├── UI/
│   │   ├── Button.tsx (shadcn)
│   │   ├── Dialog.tsx (shadcn)
│   │   ├── Select.tsx (shadcn)
│   │   ├── Slider.tsx (shadcn)
│   │   ├── Tabs.tsx (shadcn)
│   │   └── Toast.tsx (shadcn)
│   └── Upload/
│       └── FileUploadZone.tsx
├── hooks/
│   ├── useMarkdown.ts
│   ├── useTheme.ts
│   ├── useKeyboardShortcuts.ts
│   └── useAutoSave.ts
├── services/
│   ├── storageService.ts
│   ├── markdownService.ts
│   ├── exportService.ts
│   └── apiService.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

### Backend Structure
```
server/
├── routes/
│   ├── markdown.ts
│   ├── export.ts
│   └── health.ts
├── middleware/
│   ├── upload.ts
│   ├── errorHandler.ts
│   └── cors.ts
├── services/
│   ├── renderService.ts
│   ├── storageService.ts
│   └── exportService.ts
├── utils/
│   └── validators.ts
└── server.ts
```

---

## 🎨 Design System (Tailwind + shadcn/ui)

### Colores
- **Primary:** `#2563eb` (blue-600)
- **Secondary:** `#64748b` (slate-500)
- **Accent:** `#06b6d4` (cyan-500)
- **Background:** `#ffffff` (light) / `#0f172a` (dark)
- **Muted:** `#f1f5f9` (light) / `#1e293b` (dark)

### Tipografía
- **Headings:** Inter (sans-serif)
- **Body:** Inter (sans-serif)
- **Code:** Fira Code (monospace)

### Componentes shadcn/ui
- Button (primario, secundario, outline)
- Input (búsqueda, numero)
- Select (dropdown)
- Dialog (modales)
- Tabs (split-view, settings)
- Slider (tamaño de fuente, ancho)
- Toast (notificaciones)
- Dropdown Menu (opciones)

---

## 📱 Flujos Principales

### 1. Upload & View
```
Usuario → Selecciona/arrastra archivo
         → Validación (.md/.markdown)
         → Carga contenido
         → Renderiza preview
         → Auto-save activado
```

### 2. Edit & Save
```
Usuario → Edita en Monaco
         → Preview actualiza en vivo
         → Auto-save cada 10s
         → Indicador "unsaved" si hay cambios
         → Historial guardado
```

### 3. Navigate
```
Usuario → TOC en sidebar actualiza
         → Click en heading → scroll a sección
         → Breadcrumb muestra posición
         → Búsqueda resalta coincidencias
```

### 4. Export
```
Usuario → Menu Export
         → Elige formato (PDF/HTML/.md)
         → Se descarga o copia al portapapeles
         → Toast de confirmación
```

---

## 🔧 Especificaciones Técnicas

### Frontend (React)
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "@monaco-editor/react": "^4.6.0",
    "marked": "^11.1.0",
    "rehype-react": "^8.0.0",
    "remark-parse": "^11.0.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.0",
    "clsx": "^2.0.0",
    "jspdf": "^2.5.0",
    "html2pdf.js": "^0.10.0",
    "zustand": "^4.4.0"
  }
}
```

### Backend (Express)
```json
{
  "dependencies": {
    "express": "^5.2.0",
    "multer": "^2.1.0",
    "marked": "^11.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0"
  }
}
```

### API Endpoints
```
POST   /api/markdown/render      (renderizar markdown)
POST   /api/markdown/upload      (subir archivo)
GET    /api/markdown/recent      (últimos archivos)
POST   /api/export/pdf           (exportar a PDF)
POST   /api/export/html          (exportar a HTML)
DELETE /api/history/:id          (borrar del historial)
GET    /api/health               (health check)
```

---

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

---

## 📊 Storage / Persistencia

### LocalStorage (Client)
```json
{
  "markdown:recent": [
    { "id": "uuid", "name": "archivo.md", "date": "2026-05-28", "size": 1024 }
  ],
  "markdown:content:uuid": "contenido del archivo",
  "markdown:versions:uuid": [
    { "timestamp": 1234567890, "content": "..." }
  ],
  "user:theme": "auto|light|dark",
  "user:fontSize": 16,
  "user:fontFamily": "sans|serif|mono"
}
```

### Optional: Backend Storage (SQLite/MongoDB)
```
documents
├── id (UUID)
├── name (string)
├── content (text)
├── createdAt (timestamp)
├── updatedAt (timestamp)
└── userId (optional)

versions
├── id (UUID)
├── documentId (FK)
├── content (text)
├── createdAt (timestamp)
└── changeType (created|edited|exported)
```

---

## 🚀 MVP vs. Extended

### MVP (Fase 1)
- ✅ Upload & preview
- ✅ Monaco Editor
- ✅ TOC + navegación
- ✅ Tema claro/oscuro
- ✅ Auto-save local
- ✅ Exportar PDF/HTML
- ✅ Responsive mobile

### Extended (Fase 2)
- 📅 Sincronización cloud (Google Drive, Dropbox)
- 👥 Colaboración en tiempo real
- 💬 Comentarios inline
- 🏷️ Etiquetas y categorías
- 🔍 Búsqueda global
- ⚡ Plantillas
- 📊 Estadísticas del documento

---

## 🎓 Mejoras sobre versión actual

| Aspecto | Anterior | Nuevo |
|---------|----------|-------|
| Editor | Textarea simple | Monaco Editor (VS Code) |
| UX | Minimalista | Moderno, accesible |
| Framework CSS | CSS custom | Tailwind + shadcn/ui |
| Componentes | HTML puro | React componentes reutilizables |
| Persistencia | Solo localStorage | localStorage + historial versionado |
| Búsqueda | No existe | Ctrl+F en documento + TOC |
| Exportación | Solo renderizado | PDF, HTML, MD |
| Mobile | Básico | Fully responsive |
| A11y | Limitado | WCAG 2.1 AA |

---

## 📦 Librerias Clave

1. **React & TypeScript** - Componentes type-safe
2. **Vite** - Build tool rápido
3. **Tailwind CSS** - Styling utilities
4. **shadcn/ui** - Componentes accesibles
5. **Monaco Editor** - Editor profesional
6. **Marked** - Markdown parser
7. **Zustand** - State management (ligero)
8. **jsPDF** - Exportar a PDF
9. **date-fns** - Manejo de fechas

---

## 🎯 Próximos Pasos

1. Crear proyecto React + TypeScript con Vite
2. Instalar y configurar Tailwind + shadcn/ui
3. Integrar Monaco Editor
4. Implementar components principales (Editor, Preview, TOC)
5. Crear backend Express
6. Implementar upload, render, export
7. Añadir tema claro/oscuro
8. Testing y responsive design
9. Deploy

---

**Status:** Especificación completa lista para desarrollo
**Última actualización:** 2026-05-28
