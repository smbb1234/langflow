import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

function Row({ label, value, theme }: { label: string; value: string; theme: WorkspaceTheme }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3">
      <span style={{ color: theme.textTertiary }}>{label}</span>
      <span className="truncate" style={{ color: theme.textPrimary }}>{value}</span>
    </div>
  );
}

export function CurrentRunSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Current run</h3>
      <div className="space-y-2 text-xs">
        <Row label="Run ID" value={run.runDisplayId || "—"} theme={theme} />
        <Row label="Started" value="14:22:01" theme={theme} />
        <Row label="Active agent" value={run.agentName || "—"} theme={theme} />
        <Row label="Stage" value="4/6 · Tool" theme={theme} />
        <Row label="Next checkpoint" value="Validate" theme={theme} />
        <Row label="Initiated by" value="priya@acme" theme={theme} />
      </div>
    </section>
  );
}
