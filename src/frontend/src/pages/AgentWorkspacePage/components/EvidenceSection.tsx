import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

function CounterCard({ label, value, theme }: { label: string; value: string; theme: WorkspaceTheme }) {
  return (
    <div className="rounded border p-3" style={{ borderColor: theme.panelBorder }}>
      <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>{label}</p>
      <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{value}</p>
    </div>
  );
}

export function EvidenceSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Evidence</h3>

      <div className="grid grid-cols-2 gap-2">
        <CounterCard label="provenance sources" value={String(run.evidenceSources.length)} theme={theme} />
        <CounterCard label="rows scanned" value={run.evidence.rowsScanned} theme={theme} />
        <CounterCard label="query hash" value={run.evidence.queryHash} theme={theme} />
        <CounterCard label="warehouse" value={run.evidence.warehouse} theme={theme} />
      </div>

      <div className="space-y-2">
        {run.evidenceSources.map((source) => (
          <div key={source.id} className="rounded border p-3" style={{ borderColor: theme.panelBorder }}>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <p style={{ color: theme.textPrimary }}>{source.name}</p>
              <p style={{ color: theme.textTertiary }}>{source.freshness}</p>
            </div>
            <div className="mt-1 grid grid-cols-[1fr_auto] gap-2">
              <p style={{ color: theme.textTertiary }}>type: {source.type}</p>
              <p style={{ color: theme.textPrimary }}>confidence: {Math.round(source.confidence * 100)}%</p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded" style={{ backgroundColor: theme.surfaceAlt }}>
              <div className="h-full rounded" style={{ width: `${source.freshnessScore}%`, backgroundColor: theme.accent }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
