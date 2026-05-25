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
    <div className="flex h-[121px] px-3 py-2 text-[11px]">
      <div className="w-[168px] shrink-0 pr-3" style={{ color: theme.textSecondary }}>
        <div className="mt-[22px] flex flex-col gap-[6px]">
          {run.trace.lanes.map((lane) => (
            <div key={lane.id} className="h-[16px] leading-[16px]">
              {lane.label}
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-w-0 flex-1 rounded border" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
        <div className="absolute left-0 right-0 top-1 flex justify-between px-2 text-[10px]" style={{ color: theme.traceAxisText }}>
          {run.trace.axisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="absolute inset-x-2 top-6 bottom-2">
          {run.trace.lanes.map((lane, idx) => (
            <div
              key={lane.id}
              className="absolute left-0 right-0 border-t"
              style={{ top: idx * 22, borderColor: theme.panelBorder }}
            />
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
  );
}
