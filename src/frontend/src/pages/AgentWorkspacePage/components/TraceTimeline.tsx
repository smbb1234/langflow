import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, TraceSegment } from "../types";

const TONE_MAP: Record<TraceSegment["tone"], (theme: WorkspaceTheme) => string> = {
  blue: (theme) => theme.traceBlue,
  green: (theme) => theme.traceGreen,
  orange: (theme) => theme.traceOrange,
  red: (theme) => theme.traceRed,
};

export function TraceTimeline({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="flex h-full min-h-0 gap-3 px-3 py-2 text-xs">
      <div className="w-[180px] shrink-0 overflow-y-auto pr-1" style={{ color: theme.textSecondary }}>
        <div className="mt-8 flex flex-col gap-2">
          {run.trace.lanes.map((lane) => (
            <div key={lane.id} className="min-h-[20px] leading-5">
              {lane.label}
            </div>
          ))}
        </div>
      </div>
      <div className="agent-workspace-hide-scrollbar min-w-0 flex-1 overflow-x-auto overflow-y-hidden rounded border" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
        <div className="relative h-full min-h-[150px] min-w-[680px]">
          <div className="absolute left-0 right-0 top-2 flex justify-between px-3 text-xs" style={{ color: theme.traceAxisText }}>
            {run.trace.axisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="absolute inset-x-3 bottom-3 top-9">
            {run.trace.lanes.map((lane, idx) => (
              <div key={lane.id} className="absolute left-0 right-0 border-t" style={{ top: idx * 24, borderColor: theme.panelBorder }} />
            ))}
            {run.trace.segments.map((segment) => (
              <div
                key={segment.id}
                className="absolute rounded-sm"
                style={{
                  left: segment.left,
                  top: segment.top,
                  width: segment.width,
                  height: segment.height,
                  backgroundColor: TONE_MAP[segment.tone](theme),
                  opacity: 0.88,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
