import type { AgentWorkspaceRun, TraceEvent } from "../types";
import type { WorkspaceTheme } from "../theme";

function eventColor(level: TraceEvent["level"], theme: WorkspaceTheme) {
  if (level === "error") return theme.error;
  if (level === "warning") return theme.warning;
  return theme.success;
}

export function TraceSummarySection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Trace</h3>

      <div className="space-y-2">
        {run.traceEvents.map((event) => (
          <div key={event.id} className="grid grid-cols-[10px_64px_1fr] items-start gap-2">
            <div className="relative flex h-full justify-center">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: eventColor(event.level, theme) }} />
              <span className="absolute top-4 h-[calc(100%+8px)] w-px" style={{ backgroundColor: theme.panelBorder }} />
            </div>
            <span style={{ color: theme.textTertiary }}>{event.timestamp}</span>
            <p style={{ color: theme.textPrimary }}>{event.message}</p>
          </div>
        ))}
      </div>

      <div className="rounded border p-3" style={{ borderColor: theme.panelBorder }}>
        <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>Handoff verification</p>
        <p style={{ color: theme.textPrimary }}>From finance_sql_agent</p>
        <p style={{ color: theme.textPrimary }}>To chart_agent</p>
        <p style={{ color: theme.textPrimary }}>Contract ChartSpecV1</p>
        <p style={{ color: theme.success }}>Verified: payload valid</p>
      </div>

      <div className="rounded border p-3" style={{ borderColor: theme.panelBorder }}>
        <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>Audit replay</p>
        <button
          className="mt-2 rounded border px-2 py-1 text-xs"
          style={{ borderColor: theme.panelBorder, color: theme.textPrimary }}
          type="button"
          onClick={() => {
            // TODO(no-op): connect replay button to audit timeline playback API.
          }}
        >
          Replay
        </button>
      </div>
    </section>
  );
}
