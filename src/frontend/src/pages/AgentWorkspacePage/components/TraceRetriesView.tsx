import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceRetriesView({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="h-[121px] px-3 py-2 text-[11px]" style={{ color: theme.textSecondary }}>
      {/* TODO: wire to telemetry API. */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBlue }}>
          <p style={{ color: theme.primaryStrong }}>Retries</p>
          <p className="text-sm" style={{ color: theme.textPrimary }}>{run.metrics.retryCount}</p>
        </div>
        <div className="rounded border p-2" style={{ borderColor: theme.warningBorder, backgroundColor: theme.surfaceWarning }}>
          <p style={{ color: theme.warning }}>Spikes</p>
          <p className="text-sm" style={{ color: theme.textPrimary }}>{run.metrics.spikeCount}</p>
        </div>
        <div className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
          <p style={{ color: theme.textSecondary }}>p95 latency</p>
          <p className="text-sm" style={{ color: theme.textPrimary }}>{run.metrics.p95Ms} ms</p>
        </div>
      </div>
    </div>
  );
}
