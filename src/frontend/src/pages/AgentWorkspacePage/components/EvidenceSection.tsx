import { EVIDENCE_FRESHNESS, EVIDENCE_SUMMARY_METRICS } from "../constants";
import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

export function EvidenceSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const maxHours = Math.max(...EVIDENCE_FRESHNESS.map((item) => item.valueHours));
  return (
    <section className="space-y-3 text-xs">
      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Provenance summary</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {EVIDENCE_SUMMARY_METRICS.map((item) => (
            <div key={item.id} className="rounded-md border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
              <p className="text-[11px]" style={{ color: theme.textTertiary }}>{item.label}</p><p className="text-[14px] font-semibold" style={{ color: theme.textPrimary }}>{item.value}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Sources used</h3>
        <div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
        {run.evidenceSources.map((source, index) => (
          <div key={source.id}>
            <div className="py-2">
              <p className="min-w-0 truncate text-[12px]" style={{ color: theme.textPrimary }}>{source.name}</p>
              <p className="text-[11px]" style={{ color: theme.textTertiary }}>{source.type === "table" ? "snowflake table" : source.type === "document" ? "policy doc" : "user memory"} · fresh {source.freshness} · conf {source.confidence.toFixed(2)}</p>
            </div>
            {index < run.evidenceSources.length - 1 ? <div className="h-px" style={{ backgroundColor: theme.panelBorder }} /> : null}
          </div>
        ))}
      </article>
      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Freshness</h3>
        <p className="text-[11px]" style={{ color: theme.textTertiary }}>Hours since each source was last refreshed</p>
        <div className="mt-2 space-y-2">
          {EVIDENCE_FRESHNESS.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_70px] items-center gap-2">
              <div className="min-w-0">
                <p className="text-[11px]" style={{ color: theme.textSecondary }}>{item.label}</p>
                <div className="mt-1 h-1 overflow-hidden rounded-full" style={{ backgroundColor: theme.surfaceMuted }}>
                  <div className="h-full" style={{ width: `${100 - (item.valueHours / maxHours) * 100}%`, backgroundColor: theme.success }} />
                </div>
              </div>
              <span className="text-right text-[11px]" style={{ color: theme.textTertiary }}>{item.valueLabel}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
