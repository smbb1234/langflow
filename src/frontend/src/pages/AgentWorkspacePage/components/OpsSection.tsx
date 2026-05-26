import type { AgentWorkspaceRun, OpsEvalMetric } from "../types";
import type { WorkspaceTheme } from "../theme";

function barTone(metric: OpsEvalMetric, theme: WorkspaceTheme) {
  if (metric.score < metric.threshold) {
    const gap = metric.threshold - metric.score;
    return gap >= 0.1 ? theme.error : theme.warning;
  }
  return theme.success;
}

export function OpsSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>
        Eval health
      </h3>

      <div className="space-y-2">
        {run.opsEvalMetrics.map((metric) => {
          const progress = Math.max(0, Math.min(metric.score, 1)) * 100;
          const threshold = Math.max(0, Math.min(metric.threshold, 1)) * 100;
          const toneColor = barTone(metric, theme);

          return (
            <div key={metric.id} className="space-y-1 rounded-md border p-2" style={{ borderColor: theme.panelBorder }}>
              <div className="flex items-center justify-between">
                <span style={{ color: theme.textPrimary }}>{metric.name}</span>
                <span style={{ color: theme.textSecondary }}>{metric.score.toFixed(2)} / {metric.threshold.toFixed(2)}</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full" style={{ backgroundColor: theme.surfaceMuted }}>
                <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: toneColor }} />
                <div className="absolute top-0 h-full border-r" style={{ left: `${threshold}%`, borderColor: theme.textMuted }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          ["Tool retries", String(run.metrics.retryCount)],
          ["Loop detector", run.metrics.spikeCount > 0 ? "watching" : "stable"],
          ["Cost trajectory", `$${run.metrics.costUsd.toFixed(2)}`],
          ["Latency spike", run.metrics.spikeCount > 0 ? `${run.metrics.spikeCount} spikes` : "none"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border px-2 py-1.5" style={{ borderColor: theme.panelBorder }}>
            <p className="text-[11px]" style={{ color: theme.textTertiary }}>{label}</p>
            <p className="mt-0.5 text-[12px]" style={{ color: theme.textPrimary }}>{value}</p>
          </div>
        ))}
      </div>

      <article className="rounded-md border p-3" style={{ borderColor: theme.warningBorder, backgroundColor: theme.surfaceWarning }}>
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold" style={{ color: theme.textPrimary }}>Regression watch</h4>
          <span className="text-[11px]" style={{ color: theme.warning }}>3 open vs last release</span>
        </div>
        <div className="mt-2 flex h-8 items-end gap-1">
          {[35, 45, 30, 55, 40, 60, 42].map((height, index) => (
            <span key={`${height}-${index}`} className="w-2 rounded-sm" style={{ height: `${height}%`, backgroundColor: theme.warning }} />
          ))}
        </div>
      </article>
    </section>
  );
}
