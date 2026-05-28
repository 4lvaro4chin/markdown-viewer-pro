# Markdown Viewer Pro - Documentación del Proyecto

## 📋 Resumen

Aplicación web moderna para visualizar, editar y gestionar archivos Markdown. Proporciona un editor integrado (Monaco Editor), vista previa en tiempo real, tabla de contenidos automática, tema claro/oscuro, auto-guardado local y exportación a PDF/HTML.

## 🏗️ Arquitectura

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** para UI components
- **Monaco Editor** para edición de código
- **Zustand** para estado ligero
- **Marked** para renderización de Markdown
- **localStorage** para persistencia

### Backend
- **Express.js** servidor
- **Multer** para subida de archivos
- **CORS** habilitado
- API REST para renderización y exportación

## 📂 Estructura de Directorios

```
src/
├── components/
│   ├── Editor/        # Editor con Monaco
│   ├── Preview/       # Vista previa y TOC
│   ├── Layout/        # Header, Sidebar, MainLayout
│   └── Upload/        # FileUploadZone
├── hooks/             # Hooks customizados
├── services/          # Lógica de negocio (storage, markdown, export, api)
├── types/             # TypeScript types
├── App.tsx            # Componente raíz
├── main.tsx           # Entry point
└── index.css          # Estilos globales

server/
└── server.ts          # Servidor Express

```

## 🎯 Flujos Principales

### 1. Upload de Documento
```
Usuario arrastra/selecciona archivo
→ Validación (.md/.markdown)
→ Lectura de contenido
→ Guardar en localStorage
→ Renderizar preview
→ Iniciar auto-save
```

### 2. Edición
```
Usuario escribe en Monaco
→ onChange actualiza estado
→ Preview actualiza en vivo
→ Auto-save cada 10s
→ Historial de versiones
```

### 3. Export
```
Usuario elige formato (PDF/HTML/.md)
→ Renderizar contenido
→ Descargar o copiar
→ Toast de confirmación
```

## 🔑 Componentes Clave

### `Editor.tsx`
- Wrapper de Monaco Editor
- Soporta syntax highlighting Markdown
- Word wrap automático
- Line numbers

### `Preview.tsx`
- Renderización de HTML con marked
- Tabla de contenidos clickeable
- Sidebar con TOC (en desktop)
- Estilos prose customizados

### `MainLayout.tsx`
- Orquesta Editor + Preview
- Maneja estados globales
- Integra file upload
- Atajos de teclado

### `Sidebar.tsx`
- Lista documentos recientes
- Botón "Nuevo documento"
- Opción de eliminar documentos
- Responsive (hidden en mobile)

## 🔌 Servicios

### `storageService.ts`
- CRUD de documentos en localStorage
- Manejo de versiones
- Historial reciente

### `markdownService.ts`
- Renderización de Markdown
- Extracción de TOC (tabla de contenidos)
- Estadísticas del documento

### `exportService.ts`
- Exportar a PDF, HTML, MD
- Copiar al portapapeles

### `apiService.ts`
- Llamadas a endpoints del backend

## 🪝 Hooks

### `useMarkdown()`
- Manejo de contenido del documento
- Save/load de documentos
- Gestión de versiones

### `useTheme()`
- Toggle light/dark/auto
- Sincroniza con localStorage
- Responde a preferencias del sistema

### `useAutoSave()`
- Auto-save cada N segundos
- Detecta cambios sin guardar

### `useKeyboardShortcuts()`
- Registra atajos de teclado
- Soporta Ctrl+Mac cmd

## 🔧 Configuración

### Vite
- HMR habilitado
- Proxy a `/api` en localhost:3000
- Path aliases (@/, @components/, etc)

### TypeScript
- `strict` mode
- `esModuleInterop` habilitado

### Tailwind
- Dark mode class-based
- Colores custom: primary (blue-600), accent (cyan-500)
- Prose plugin para markdown

## 📦 Dependencias Notables

- `@monaco-editor/react` - Editor profesional
- `marked` - Parser Markdown (sin sanitización, usar con cuidado en UGC)
- `jspdf` - Exportación PDF
- `html2canvas` - Captura de HTML
- `lucide-react` - Iconos
- `zustand` - State management ligero

## 🚀 Próximos Pasos (MVP v2)

1. [ ] Implementar PDF export funcional con jsPDF
2. [ ] Agregar más opciones de personalización (font size, line width)
3. [ ] Cloud storage (Google Drive, Dropbox)
4. [ ] Búsqueda global
5. [ ] Colaboración en tiempo real
6. [ ] Comentarios inline
7. [ ] Plantillas de documentos
8. [ ] Share público con link
9. [ ] Analytics del documento
10. [ ] Dark mode en editor Monaco

## 🐛 Problemas Conocidos

- Monaco Editor en dark mode necesita tema customizado
- `dangerouslySetInnerHTML` en Preview (considerar DOMPurify para UGC)
- PDF export es stub, necesita implementación real
- Sin validación de archivo en server-side (solo cliente)

## 🔐 Consideraciones de Seguridad

- Marcar contenido user-generated como `dangerouslySetInnerHTML` es riesgo XSS
- Implementar DOMPurify si acepta markdown de usuarios untrusted
- Validar tipo MIME en ambos lados (client + server)
- CORS configurado por defecto a todos

## ⌨️ Atajos Implementados

- `Ctrl+S` - Forzar guardado
- `Ctrl+E` - Toggle view (split/editor/preview)
- `Ctrl+T` - Toggle tema (stub)
- Todos los atajos de Monaco (F, H, Z, Y, etc)

## 📊 LocalStorage Schema

```json
{
  "markdown:recent": [
    { "id": "doc_...", "name": "...", "date": "2026-05-28", "size": 1024 }
  ],
  "markdown:content:doc_...": "contenido markdown",
  "markdown:metadata:doc_...": { "id": "...", "name": "...", "createdAt": 1234567890, "updatedAt": 1234567890, "size": 1024 },
  "markdown:versions:doc_...": [
    { "id": "v_...", "documentId": "doc_...", "content": "...", "timestamp": 1234567890, "changeType": "created|edited|exported" }
  ],
  "user:theme": "light|dark|auto",
  "user:fontSize": 16,
  "user:fontFamily": "sans|serif|mono"
}
```

## 🌐 API Endpoints

```
POST   /api/markdown/render
POST   /api/markdown/upload
GET    /api/markdown/recent
POST   /api/export/pdf
POST   /api/export/html
DELETE /api/history/:id
GET    /api/health
```

## 💡 Tips para Mantenimiento

1. Mantener separación entre componentes UI y lógica (hooks/services)
2. Usar types/ para todas las interfaces compartidas
3. Cada servicio debe ser agnóstico de React
4. Componentes deben ser lo más simples posible
5. LocalStorage es la fuente de verdad para persistencia

## 🎨 Design System

### Colores
- Primary: `#2563eb` (blue-600)
- Secondary: `#64748b` (slate-500)
- Accent: `#06b6d4` (cyan-500)
- Fondo claro: `#ffffff`
- Fondo oscuro: `#0f172a`

### Tipografía
- Headings: Inter (sans-serif)
- Body: Inter (sans-serif)
- Code: Fira Code (monospace)
