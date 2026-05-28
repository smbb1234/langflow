import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  COLLAPSED_TRACE_HEIGHT,
  DEFAULT_TRACE_HEIGHT,
  MAX_TRACE_HEIGHT,
  MAX_TRACE_HEIGHT_RATIO,
  MIN_TRACE_HEIGHT,
} from "../constants";
import { clampResizableValue } from "../hooks/useResizablePanel";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, WorkspaceTab } from "../types";
import { ConversationThread } from "./ConversationThread";
import { ResizeHandle } from "./ResizeHandle";
import { RunHeader } from "./RunHeader";
import { TraceConsoleBar } from "./TraceConsoleBar";
import { WorkspacePromptInput } from "./WorkspacePromptInput";

type RunMainPanelProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
  onBranchRun?: () => void;
  onExportRun?: () => void;
  onOpenRunMenu?: () => void;
  traceHeight?: number;
  onTraceHeightChange?: (height: number) => void;
};

const getMaxTraceHeight = () => {
  if (typeof window === "undefined") {
    return MAX_TRACE_HEIGHT;
  }

  return Math.min(
    MAX_TRACE_HEIGHT,
    window.innerHeight * MAX_TRACE_HEIGHT_RATIO,
  );
};

export function RunMainPanel({
  run,
  theme,
  activeTab = "overview",
  onTabChange,
  onBranchRun,
  onExportRun,
  onOpenRunMenu,
  traceHeight = DEFAULT_TRACE_HEIGHT,
  onTraceHeightChange,
}: RunMainPanelProps) {
  const [traceCollapsed, setTraceCollapsed] = useState(false);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  void activeTab;
  void onTabChange;

  useEffect(
    () => () => {
      dragCleanupRef.current?.();
    },
    [],
  );

  const startTraceResize = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (traceCollapsed) {
        return;
      }

      dragCleanupRef.current?.();
      event.preventDefault();

      const startY = event.clientY;
      const startHeight = clampResizableValue(
        traceHeight,
        MIN_TRACE_HEIGHT,
        getMaxTraceHeight(),
      );
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;

      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const maxTraceHeight = getMaxTraceHeight();
        const nextHeight = clampResizableValue(
          startHeight - (moveEvent.clientY - startY),
          MIN_TRACE_HEIGHT,
          maxTraceHeight,
        );
        onTraceHeightChange?.(nextHeight);
      };

      const stopResize = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", stopResize);
        document.removeEventListener("pointercancel", stopResize);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
        dragCleanupRef.current = null;
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", stopResize);
      document.addEventListener("pointercancel", stopResize);
      dragCleanupRef.current = stopResize;
    },
    [onTraceHeightChange, traceCollapsed, traceHeight],
  );

  const consoleHeight = traceCollapsed
    ? COLLAPSED_TRACE_HEIGHT
    : clampResizableValue(traceHeight, MIN_TRACE_HEIGHT, getMaxTraceHeight());

  return (
    <main
      className="flex min-h-0 min-w-0 flex-1 flex-col"
      style={{ backgroundColor: theme.pageBg }}
    >
      <RunHeader
        run={run}
        theme={theme}
        onBranchRun={onBranchRun}
        onExportRun={onExportRun}
        onOpenRunMenu={onOpenRunMenu}
      />
      {/* TODO: render non-overview panels once each tab gets dedicated content. */}
      <ConversationThread run={run} theme={theme} />
      <div className="h-[128px] shrink-0">
        <WorkspacePromptInput run={run} theme={theme} />
      </div>
      <div
        className="relative shrink-0 min-h-0"
        style={{ height: consoleHeight }}
      >
        {!traceCollapsed ? (
          <ResizeHandle
            ariaLabel="Resize trace console"
            className="absolute left-0 top-0 z-10"
            onResizeStart={startTraceResize}
            orientation="horizontal"
            theme={theme}
          />
        ) : null}
        <TraceConsoleBar
          run={run}
          theme={theme}
          collapsed={traceCollapsed}
          onToggleCollapsed={setTraceCollapsed}
        />
      </div>
    </main>
  );
}
