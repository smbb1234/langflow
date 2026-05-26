import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, TraceEvent } from "../types";

function toStatus(level: TraceEvent["level"]) {
  if (level === "error") return "error";
  if (level === "warning") return "warning";
  return "ok";
}

export function TraceRawEvents({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="h-[121px] overflow-auto px-3 py-2 text-[11px] font-mono" style={{ color: theme.textSecondary }}>
      <table className="w-full border-separate border-spacing-y-1">
        <thead>
          <tr>
            <th className="text-left font-medium" style={{ color: theme.textTertiary }}>time</th>
            <th className="text-left font-medium" style={{ color: theme.textTertiary }}>event</th>
            <th className="text-left font-medium" style={{ color: theme.textTertiary }}>detail</th>
            <th className="text-left font-medium" style={{ color: theme.textTertiary }}>status</th>
          </tr>
        </thead>
        <tbody>
          {run.traceEvents.map((event) => (
            <tr key={event.id} className="rounded border" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
              <td className="px-2 py-1 align-top" style={{ color: theme.textMuted }}>{event.timestamp}</td>
              <td className="px-2 py-1 align-top" style={{ color: theme.textPrimary }}>{event.laneId}</td>
              <td className="px-2 py-1 align-top" style={{ color: theme.textSecondary }}>{event.message}</td>
              <td className="px-2 py-1 align-top" style={{ color: theme.textPrimary }}>{toStatus(event.level)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
