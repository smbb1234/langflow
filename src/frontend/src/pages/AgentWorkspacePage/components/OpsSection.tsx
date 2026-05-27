import { OPS_SIGNALS } from "../constants";
import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

export function OpsSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return <section className="space-y-3 text-xs">
    <article className="rounded-lg border p-4" style={{ borderColor: theme.surfaceErrorBorder, backgroundColor: theme.surface }}>
      <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Eval health</h3><div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
      <div className="mt-2 space-y-2">{run.opsEvalMetrics.map((metric) => {
        const tone = metric.name === "tone.formal" ? theme.error : theme.success;
        return <div key={metric.id}><div className="flex justify-between gap-2"><span style={{ color: theme.textPrimary }}>{metric.name}</span><span><span style={{ color: tone }}>{metric.score.toFixed(2)}</span><span style={{ color: theme.textTertiary }}> / {metric.threshold.toFixed(2)}</span></span></div>
          <div className="mt-1 h-1 rounded-full" style={{ backgroundColor: theme.surfaceMuted }}><div className="h-full rounded-full" style={{ width: `${metric.score * 100}%`, backgroundColor: tone }} /></div></div>;
      })}</div>
    </article>
    <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Anomaly / loop signals</h3><div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
      <div className="mt-2 space-y-1.5">{OPS_SIGNALS.map((item) => <div key={item.id} className="flex justify-between"><span style={{ color: theme.textTertiary }}>{item.label}</span><span style={{ color: item.tone === "success" ? theme.success : item.tone === "warning" ? theme.warning : theme.textPrimary }}>{item.value}</span></div>)}</div>
    </article>
    <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Regression watch</h3><div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
      <div className="mt-2 flex items-end justify-between gap-4"><div><p className="text-3xl font-semibold" style={{ color: theme.warning }}>3</p><p className="text-[11px]" style={{ color: theme.textTertiary }}>open vs last release</p></div>
      <svg viewBox="0 0 120 40" className="h-12 w-32"><polyline points="4,34 24,30 44,28 64,24 84,19 104,12 116,8" fill="none" stroke={theme.warning} strokeWidth="2" /><circle cx="116" cy="8" r="2.5" fill={theme.warning} /></svg></div>
    </article>
  </section>;
}
