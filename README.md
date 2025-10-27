# 🎨 Deno AI Toolkit UI

**Admin UI components for [Deno AI Toolkit](https://jsr.io/@karelkangro/deno-ai-toolkit) workspace management**

A comprehensive React component library for building admin interfaces that manage AI workspaces, vector embeddings, knowledge bases, and business rules powered by the Deno AI Toolkit backend.

## ✨ Features

- 🏗️ **Workspace Management** - Create, update, delete, and list AI workspaces
- 📁 **File Upload & Management** - Drag-and-drop file uploads with progress tracking
- 🔍 **Vector Embeddings** - Embed documents and manage vector search
- 📋 **Rules & Schemas** - Dynamic business rule management
- 🎨 **Customizable Themes** - Tailwind CSS with CSS variables for easy theming
- 🔌 **Plug-and-play** - Works with any Deno AI Toolkit backend
- ⚡ **React Query Integration** - Built-in caching and state management
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript Native** - Fully typed interfaces

## 📦 Installation

```bash
npm install @karelkangro/deno-ai-toolkit-ui
# or
yarn add @karelkangro/deno-ai-toolkit-ui
# or
pnpm add @karelkangro/deno-ai-toolkit-ui
```

### Peer Dependencies

```bash
npm install react react-dom @tanstack/react-query react-router-dom
```

## 🚀 Quick Start

### 1. Wrap your app with providers

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WorkspaceProvider } from '@karelkangro/deno-ai-toolkit-ui';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider
        apiConfig={{
          baseUrl: 'https://your-api.com',
          endpoints: {
            workspaces: '/api/workspaces',
            workspaceData: '/api/workspace-data'
          }
        }}
      >
        <YourApp />
      </WorkspaceProvider>
    </QueryClientProvider>
  );
}
```

### 2. Import CSS (required)

```tsx
import '@karelkangro/deno-ai-toolkit-ui/styles';
```

### 3. Use components

```tsx
import { WorkspaceList, WorkspaceDetails } from '@karelkangro/deno-ai-toolkit-ui';

function WorkspacesPage() {
  return (
    <div>
      <h1>AI Workspaces</h1>
      <WorkspaceList
        onWorkspaceClick={(id) => navigate(`/workspace/${id}`)}
      />
    </div>
  );
}
```

## 📚 Components

### Workspace Management

#### `<WorkspaceList />`
Displays a grid of workspace cards with actions.

```tsx
<WorkspaceList
  onWorkspaceClick={(id) => console.log(id)}
  onWorkspaceEdit={(workspace) => console.log(workspace)}
  onWorkspaceDelete={(workspace) => console.log(workspace)}
/>
```

#### `<WorkspaceCard />`
Individual workspace card component.

```tsx
<WorkspaceCard
  workspace={workspace}
  onOpen={() => {}}
  onEdit={() => {}}
  onDelete={() => {}}
/>
```

#### `<WorkspaceDetails />`
Complete workspace detail view with tabs.

```tsx
<WorkspaceDetails workspaceId="workspace-123" />
```

### File Management

#### `<WorkspaceFiles />`
File upload and management interface.

```tsx
<WorkspaceFiles
  workspaceId="workspace-123"
  onFilesUpdated={() => console.log('Files updated')}
/>
```

### Modals

#### `<CreateWorkspaceModal />`
```tsx
<CreateWorkspaceModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCreate={(data) => console.log(data)}
/>
```

#### `<UpdateWorkspaceModal />`
```tsx
<UpdateWorkspaceModal
  isOpen={isOpen}
  workspace={workspace}
  onClose={() => setIsOpen(false)}
  onUpdate={(data) => console.log(data)}
/>
```

## 🎨 Theming

The library uses Tailwind CSS with customizable CSS variables:

```css
:root {
  --workspace-primary: #3b82f6;
  --workspace-secondary: #8b5cf6;
  --workspace-accent: #10b981;
  --workspace-danger: #ef4444;
  --workspace-radius: 0.5rem;
}
```

## 🔌 API Configuration

### Default Configuration

```typescript
const config = {
  baseUrl: 'https://api.example.com',
  endpoints: {
    workspaces: '/api/workspaces',
    workspaceData: '/api/workspace-data',
    embeddings: '/api/embeddings'
  },
  headers: {
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value'
  },
  timeout: 30000 // 30 seconds
};
```

### Custom API Client

```typescript
import { createWorkspaceClient } from '@karelkangro/deno-ai-toolkit-ui';

const client = createWorkspaceClient({
  baseUrl: process.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
});

// Use the client directly
const workspaces = await client.getWorkspaces();
```

## 🪝 Hooks

### `useWorkspaces()`
Manage workspace CRUD operations.

```typescript
import { useWorkspaces } from '@karelkangro/deno-ai-toolkit-ui';

function MyComponent() {
  const {
    workspaces,
    loading,
    error,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace
  } = useWorkspaces();

  return (
    <div>
      {workspaces.map(ws => <div key={ws.id}>{ws.name}</div>)}
    </div>
  );
}
```

### `useWorkspaceDetails(id)`
Get detailed workspace information.

```typescript
const {
  workspace,
  knowledgeBaseFiles,
  loading,
  refreshWorkspace
} = useWorkspaceDetails('workspace-id');
```

## 📖 Examples

### Complete Admin Dashboard

```tsx
import {
  WorkspaceProvider,
  WorkspaceList,
  WorkspaceDetails
} from '@karelkangro/deno-ai-toolkit-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

function AdminDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider
        apiConfig={{
          baseUrl: import.meta.env.VITE_API_URL,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/workspaces" element={<WorkspaceList />} />
            <Route path="/workspace/:id" element={<WorkspaceDetails />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </QueryClientProvider>
  );
}
```

## 🏗️ Backend Integration

This library is designed to work with the [Deno AI Toolkit](https://jsr.io/@karelkangro/deno-ai-toolkit) backend.

### Required Backend Endpoints

```typescript
// Deno backend example
import { createWorkspaceKV, createLanceDB } from "jsr:@karelkangro/deno-ai-toolkit";

// GET /api/workspaces - List all workspaces
// POST /api/workspaces - Create workspace
// PUT /api/workspaces?id={id} - Update workspace
// DELETE /api/workspaces?id={id} - Delete workspace

// GET /api/workspace-data?workspaceId={id}&action=knowledge-base
// POST /api/workspace-data?workspaceId={id}&action=upload
// POST /api/workspace-data?workspaceId={id}&action=embed
```

See the [Deno AI Toolkit documentation](https://github.com/karelkangro/deno-ai-toolkit) for backend setup.

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/karelkangro/deno-ai-toolkit-ui.git
cd deno-ai-toolkit-ui

# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build

# Type check
npm run type-check
```

## 📄 License

MIT © Karel Kangro

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Deno AI Toolkit (Backend)](https://jsr.io/@karelkangro/deno-ai-toolkit)
- [GitHub Repository](https://github.com/karelkangro/deno-ai-toolkit-ui)
- [NPM Package](https://www.npmjs.com/package/@karelkangro/deno-ai-toolkit-ui)
- [Issues](https://github.com/karelkangro/deno-ai-toolkit-ui/issues)

---

**Built with ❤️ for the Deno AI community**
