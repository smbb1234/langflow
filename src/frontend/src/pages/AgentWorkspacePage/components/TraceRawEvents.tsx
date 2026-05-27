import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, TraceEvent } from "../types";

function toStatus(level: TraceEvent["level"]) {
  if (level === "error") return "error";
  if (level === "warning") return "warning";
  return "ok";
}

export function TraceRawEvents({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="h-full min-h-0 overflow-auto px-3 py-2 text-xs" style={{ color: theme.textSecondary }}>
      <div className="min-w-[720px]">
        <table className="w-full border-separate border-spacing-y-1.5">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium" style={{ color: theme.textTertiary }}>time</th>
              <th className="px-2 py-1 text-left text-xs font-medium" style={{ color: theme.textTertiary }}>event</th>
              <th className="px-2 py-1 text-left text-xs font-medium" style={{ color: theme.textTertiary }}>detail</th>
              <th className="px-2 py-1 text-left text-xs font-medium" style={{ color: theme.textTertiary }}>status</th>
            </tr>
          </thead>
          <tbody>
            {run.traceEvents.map((event) => {
              const status = toStatus(event.level);
              const statusStyle =
                status === "error"
                  ? { backgroundColor: theme.surfaceError, borderColor: theme.surfaceErrorBorder, color: theme.error }
                  : status === "warning"
                    ? { backgroundColor: theme.surfaceWarning, borderColor: theme.warningBorder, color: theme.warning }
                    : { backgroundColor: theme.surfaceGreen, borderColor: theme.successBorder, color: theme.success };

              return (
                <tr key={event.id} className="rounded border" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
                  <td className="px-2 py-1.5 align-top font-mono" style={{ color: theme.textMuted }}>{event.timestamp}</td>
                  <td className="px-2 py-1.5 align-top font-mono" style={{ color: theme.textPrimary }}>{event.laneId}</td>
                  <td className="px-2 py-1.5 align-top" style={{ color: theme.textSecondary }}>{event.message}</td>
                  <td className="px-2 py-1.5 align-top">
                    <span className="rounded-full border px-2 py-0.5 text-[11px] font-semibold" style={statusStyle}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
