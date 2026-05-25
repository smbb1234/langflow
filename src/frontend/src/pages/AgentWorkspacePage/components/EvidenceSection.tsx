import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

function DataRow({ label, value, theme }: { label: string; value: string; theme: WorkspaceTheme }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-3">
      <span style={{ color: theme.textTertiary }}>{label}</span>
      <span style={{ color: theme.textPrimary }}>{value}</span>
    </div>
  );
}

export function EvidenceSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const { evidence } = run;

  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Evidence</h3>
      <div className="space-y-2">
        <DataRow label="warehouse" value={evidence.warehouse} theme={theme} />
        <DataRow label="source" value={evidence.source} theme={theme} />
        <DataRow label="freshness" value={evidence.freshness} theme={theme} />
        <DataRow label="rowsScanned" value={evidence.rowsScanned} theme={theme} />
        <DataRow label="queryHash" value={evidence.queryHash} theme={theme} />
      </div>
      {/* TODO: wire to evidence provenance API */}
    </section>
  );
}
