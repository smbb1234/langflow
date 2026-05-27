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

## Phase 2: RunSidebar JAI Layout Refactor

### Sidebar anatomy
- Full-height sidebar remains the first column in the workspace row.
- Top branding block now lives in the sidebar and includes JAI logo + "Agentic Workspace" product label.
- "New run" action sits directly below branding.
- Search input remains local-state driven.
- Filter row is single-line, with overflow fallback.
- Run list remains scrollable (`min-h-0 flex-1 overflow-y-auto`).
- User profile remains pinned at the bottom with a top border.

### Width decision
- Sidebar width changed from `w-[265px]` to `w-[288px]`.
- `288px` is the smallest increment that keeps the larger filter tabs readable and one-row at standard desktop widths without forcing global style hacks.

### Filter no-wrap rule
- Filters now use `flex-nowrap` in an inner row.
- Container adds `overflow-x-auto` as fallback only.
- Wrapping behavior (`flex-wrap`) is intentionally removed to prevent "Failed" from dropping below "Pending".

### Typography adjustments
- New run button: `text-[13px]`, stable `h-11` height.
- Search input: `text-[13px]`.
- Filter tabs: `text-[12px]` and `h-[30px]`.
- Run titles remain `text-[13px]`.
- Run metadata remains `text-[11px]`.

### Accessibility updates
- Preserved `aria-label` on create button and search input.
- Added `aria-pressed` on filter buttons.
- Added `aria-current="true"` on selected run items.

### Tests added
- Added `RunSidebar` unit tests for branding, controls, filter count, no-wrap class, filter behavior, search behavior, and selected-run fallback state.

## Phase 3: Header Hierarchy + Tab Synchronization

### Header hierarchy refinement
- `WorkspaceTopBar` remains the run-context/control strip and no longer reserves logo space.
- `RunHeader` was compacted to a tighter height (`48px`) with preserved actions (Branch, Export, menu).
- `WorkspaceTabs` remains directly below `RunHeader` and the layout no longer introduces any extra empty separator row between header/tabs/content.

### Unwanted bar root cause and fix
- The visual noise came from stacked header/tabs density and spacing, not a separate functional row.
- The fix was an incremental compaction and overflow cleanup:
  - compact `RunHeader` height and typography,
  - preserve single tabs row with existing nav,
  - keep conversation content immediately following tab navigation.

### Top bar overflow strategy
- Stage chips are no longer gated behind `2xl` visibility.
- The stage-chip group now uses horizontal overflow behavior to preserve all critical stage states on narrower viewports.
- Top-bar pills were increased from 10px text to 11px for readability; icon action buttons were increased from 24px to 28px hit size.

### Tab synchronization model
- `activeTab` is now owned by `AgentWorkspacePage`.
- `RunMainPanel` and `RunInspectorPanel` both consume the same controlled `activeTab` and `onTabChange`.
- `RunInspectorPanel` local fallback tab state was removed to avoid uncontrolled divergence.
- Clicking tabs in either main or inspector updates the same state source.

### Tests added
- Added `src/frontend/src/pages/AgentWorkspacePage/__tests__/workspace-layout.test.tsx` to cover:
  - top-bar context rendering (including stage chips and approvals/notifications),
  - run-header key controls and compact structure,
  - synchronized tab state between main tabs and inspector tabs.

### Commands run and results
- `cd src/frontend && npm run lint` ⚠️ failed due existing repository-wide lint violations outside `AgentWorkspacePage`.
- `cd src/frontend && npm run type-check` ⚠️ command script includes `vite` after `tsc` and does not terminate in this non-interactive check workflow.
- `cd src/frontend && npm run test -- src/pages/AgentWorkspacePage/__tests__/workspace-layout.test.tsx src/pages/AgentWorkspacePage/__tests__/index.test.tsx` ✅ passed.
- `cd src/frontend && npm run build` ✅ passed.

## Phase 4: Conversation Column + Composer + Result Card

### Main conversation column strategy
- `ConversationThread` keeps the outer scroll contract (`flex-1 min-h-0 overflow-y-auto`).
- Added an inner centered wrapper with `w-full max-w-[760px] mx-auto` semantics (`self-center`) to keep message width readable on wide screens.
- Added `data-testid="conversation-centered-column"` for stable layout assertions in tests.

### Message readability updates
- Message body text increased to 14px equivalent (`text-sm`).
- Metadata/timestamps remain at 12px (`text-xs`).
- Existing theme tokens/colors were preserved.

### StepListCard spacing updates
- Row height increased to 35px (from 30px).
- Step text increased to 13px.
- Status markers (done/active/pending) were preserved.
- Long labels now use safer truncation containment with `min-w-0` + `flex-1` in the left row content.

### ToolChoiceCard compact vs non-compact behavior
- `compact=false` (main conversation): responsive card grid (`1/2/3` columns based on breakpoint) with stronger selected card styling via existing selected border/background logic.
- `compact=true` (inspector): keeps vertical compact list behavior.
- Rendering logic remains shared; layout differences are class-based conditionals.
- Added stable test hooks:
  - `tool-choice-layout-main`
  - `tool-choice-layout-compact`

### Result card mock-data strategy
- Added optional `mockResult` on `AgentWorkspaceRun` for UI-only result rendering.
- Added static mock payload in `constants.ts` (headline, summary, insight, and Q2/Q3 comparison rows).
- Added a new analyzed/result section in `ConversationThread`:
  - short analysis narrative,
  - simple CSS-only comparison bars (no chart library),
  - no backend calls.

### Prompt composer layout
- `WorkspacePromptInput` now uses a centered inner wrapper matching conversation max-width (`max-w-[760px]`).
- Composer remains in bottom section of `RunMainPanel`.
- Textarea uses 14px typography (`text-sm`).
- Chip/button row includes overflow fallback (`overflow-x-auto`) to avoid layout breaks on narrow widths.

### Vertical layout stability (`RunMainPanel`)
- Prompt container and trace console heights are now explicitly `shrink-0` to preserve bottom visibility.
- `ConversationThread` remains the scrollable area in the `min-h-0` flex column chain.

### Tests added
- Added `src/frontend/src/pages/AgentWorkspacePage/__tests__/conversation-components.test.tsx` covering:
  - ConversationThread core message rendering, planning cards, result section, centered wrapper,
  - StepListCard status markers and long labels,
  - ToolChoiceCard compact/non-compact layout modes + selected summary/score rendering,
  - WorkspacePromptInput controls, typing, shortcut submit, callbacks, centered wrapper.

### Commands run and results
- `cd src/frontend && npm run test -- src/pages/AgentWorkspacePage/__tests__/conversation-components.test.tsx src/pages/AgentWorkspacePage/__tests__/workspace-layout.test.tsx src/pages/AgentWorkspacePage/__tests__/index.test.tsx` ✅ passed.
- `cd src/frontend && npm run lint` ⚠️ failed due existing repository-wide lint violations outside `AgentWorkspacePage` scope.
- `cd src/frontend && npm run type-check` ⚠️ script runs `tsc` followed by `vite` and does not produce a finite non-interactive completion signal for this workflow.
- `cd src/frontend && npm run build` ✅ passed.
