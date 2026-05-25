import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

export function TraceSummarySection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Trace</h3>
      <div className="space-y-2">
        <p style={{ color: theme.textPrimary }}>active agent: {run.agentName}</p>
        <p style={{ color: theme.textPrimary }}>current stage: {run.currentStep}/{run.totalSteps}</p>
        <p style={{ color: theme.textPrimary }}>event count: {run.metrics.eventCount}</p>
        <p style={{ color: theme.textPrimary }}>retry count: {run.metrics.retryCount}</p>
      </div>
      {/* TODO: wire to trace API */}
    </section>
  );
}
