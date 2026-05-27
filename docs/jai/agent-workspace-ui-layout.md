# Agent Workspace UI Layout

## Phase 1: Page Shell Refactor

### New shell structure
The Agent Workspace page shell now uses a full-height row layout:

- Outer shell: `h-screen w-screen overflow-hidden`
- Main row: `flex h-full w-full`
- Left sidebar: first child in row, full-height by parent inheritance
- Right workspace column: `flex min-w-0 flex-1 flex-col`
- Top bar: rendered inside the right workspace column
- Content row under top bar: `flex min-h-0 flex-1` with main panel + inspector panel

### Why the sidebar is full-height
The JAI workspace target treats the run list as persistent navigation. Making the sidebar a first-class full-height column keeps it visually stable and independent from right-side workspace content scrolling.

### Why `WorkspaceTopBar` belongs to the right workspace
The top bar controls run and execution context for the workspace content area, not global navigation. Nesting it in the right column prevents it from spanning across the left sidebar and aligns it to the workspace surface it governs.

### Layout notes
- Removed shell dependency on `h-[calc(100vh-44px)]` in favor of flexbox `min-h-0` sizing.
- Existing dark/light theme behavior and mock data wiring remain unchanged.
- `AlertDisplayArea` remains fixed and unchanged.

### Commands run and results
- `npm install --no-fund` ⚠️ failed due to npm registry access policy (`403 Forbidden` in this environment).
- `npm run lint` ⚠️ failed due pre-existing repository-wide Biome issues unrelated to this change.
- `npm run type-check` ⚠️ failed due pre-existing repository-wide TypeScript issues unrelated to this change.
- `npm run test -- src/pages/AgentWorkspacePage/__tests__/index.test.tsx` ✅ passed.
- `npm run build` ✅ passed.
