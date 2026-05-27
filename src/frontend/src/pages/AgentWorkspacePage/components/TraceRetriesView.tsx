import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceRetriesView({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const sampleCount = run.latencySamples.length;
  const p50 = sampleCount ? Math.round(run.latencySamples.reduce((sum, sample) => sum + sample.p50Ms, 0) / sampleCount) : 0;
  const p95 = sampleCount ? Math.round(run.latencySamples.reduce((sum, sample) => sum + sample.p95Ms, 0) / sampleCount) : 0;
  const max = sampleCount ? Math.max(...run.latencySamples.map((sample) => sample.p95Ms)) : 0;
  const retries = run.metrics.retryCount;

  const barScaleMax = Math.max(max, 1);

  return (
    <div className="h-full min-h-0 overflow-auto px-3 py-2 text-xs" style={{ color: theme.textSecondary }}>
      <div className="space-y-3">
        {sampleCount ? (
          <div className="space-y-1.5">
            {run.latencySamples.map((sample) => (
              <div key={sample.timestamp} className="grid grid-cols-[64px_1fr_70px] items-center gap-2">
                <span className="font-mono text-[11px]" style={{ color: theme.textTertiary }}>{sample.timestamp}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: theme.surfaceMuted }}>
                  <div className="h-full rounded-full" style={{ width: `${(sample.p95Ms / barScaleMax) * 100}%`, backgroundColor: theme.primaryStrong }} />
                </div>
                <span className="text-right text-xs font-medium" style={{ color: theme.textPrimary }}>{sample.p95Ms}ms</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded border border-dashed px-3 py-2 text-xs" style={{ borderColor: theme.panelBorder, color: theme.textTertiary }}>
            No latency samples available.
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p className="text-xs" style={{ color: theme.textTertiary }}>p50</p>
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{p50} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p className="text-xs" style={{ color: theme.textTertiary }}>p95</p>
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{p95} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p className="text-xs" style={{ color: theme.textTertiary }}>max</p>
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{max} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p className="text-xs" style={{ color: theme.textTertiary }}>retries</p>
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{retries}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
