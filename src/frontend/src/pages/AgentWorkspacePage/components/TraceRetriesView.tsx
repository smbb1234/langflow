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
    <div className="h-[121px] overflow-auto px-3 py-2 text-[11px]" style={{ color: theme.textSecondary }}>
      <div className="space-y-2">
        <div className="space-y-1">
          {run.latencySamples.map((sample) => (
            <div key={sample.timestamp} className="flex items-center gap-2">
              <span className="w-12" style={{ color: theme.textTertiary }}>{sample.timestamp}</span>
              <div className="h-2 flex-1 overflow-hidden rounded" style={{ backgroundColor: theme.surfaceMuted }}>
                <div className="h-full rounded" style={{ width: `${(sample.p95Ms / barScaleMax) * 100}%`, backgroundColor: theme.accent }} />
              </div>
              <span className="w-14 text-right" style={{ color: theme.textPrimary }}>{sample.p95Ms}ms</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p style={{ color: theme.textTertiary }}>p50</p>
            <p style={{ color: theme.textPrimary }}>{p50} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p style={{ color: theme.textTertiary }}>p95</p>
            <p style={{ color: theme.textPrimary }}>{p95} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p style={{ color: theme.textTertiary }}>max</p>
            <p style={{ color: theme.textPrimary }}>{max} ms</p>
          </div>
          <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p style={{ color: theme.textTertiary }}>retries</p>
            <p style={{ color: theme.textPrimary }}>{retries}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
