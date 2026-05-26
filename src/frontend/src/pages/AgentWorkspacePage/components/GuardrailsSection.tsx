import type { AgentWorkspaceRun, GuardrailCheck } from "../types";
import type { WorkspaceTheme } from "../theme";

function statusColor(status: GuardrailCheck["status"], theme: WorkspaceTheme) {
  if (status === "failed") return theme.error;
  if (status === "warning") return theme.warning;
  return theme.success;
}

export function GuardrailsSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Prompt Security Center</h3>
      <div className="font-medium" style={{ color: theme.textPrimary }}>12/12 checks passing in last 5m</div>

      <div className="space-y-2 rounded border p-3" style={{ borderColor: theme.panelBorder }}>
        <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>Checks</p>
        {run.guardrailChecks.map((check) => (
          <div key={check.id} className="flex items-start justify-between gap-3">
            <div>
              <p style={{ color: theme.textPrimary }}>{check.name}</p>
              <p style={{ color: theme.textTertiary }}>{check.detail}</p>
            </div>
            <span className="uppercase" style={{ color: statusColor(check.status, theme) }}>{check.status}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 rounded border p-3" style={{ borderColor: theme.panelBorder }}>
        <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>Events</p>
        {run.guardrailEvents.map((event) => (
          <div key={event.id} className="grid grid-cols-[56px_1fr_auto] gap-2">
            <span style={{ color: theme.textTertiary }}>{event.timestamp}</span>
            <span style={{ color: theme.textPrimary }}>{event.message}</span>
            <span className="uppercase" style={{ color: statusColor(event.status, theme) }}>{event.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
