import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceRawEvents({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="h-[121px] overflow-auto px-3 py-2 text-[11px]" style={{ color: theme.textSecondary }}>
      {/* TODO: replace mock events with stream events. */}
      <ul className="space-y-2">
        {run.events.map((event) => (
          <li key={event.id} className="rounded border px-2 py-1" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
            <div className="flex items-center justify-between">
              <span style={{ color: theme.textPrimary }}>{event.summary}</span>
              <span style={{ color: theme.textMuted }}>{event.timestamp}</span>
            </div>
            <div style={{ color: theme.textTertiary }}>{event.actor}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
