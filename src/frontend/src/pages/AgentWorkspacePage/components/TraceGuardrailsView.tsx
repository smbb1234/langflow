import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceGuardrailsView({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const statusColor = run.guardrails.status === "failed" ? theme.error : run.guardrails.status === "warning" ? theme.warning : theme.success;

  return (
    <div className="h-[121px] px-3 py-2 text-[11px]" style={{ color: theme.textSecondary }}>
      {/* TODO: wire to guardrail event stream. */}
      <div className="rounded border p-3" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
        <p style={{ color: theme.textPrimary }}>Status: <span style={{ color: statusColor }}>{run.guardrails.status}</span></p>
        <p>Checks passed: {run.guardrails.passed}/{run.guardrails.total}</p>
      </div>
    </div>
  );
}
