import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function WorkspaceTopBar({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const chipStyle = { border: `1px solid ${theme.pillBorder}`, color: theme.textSecondary, backgroundColor: theme.pillBg };
  return (
    <header className="grid h-[44px] grid-cols-[1fr_auto_1fr] items-center px-3" style={{ backgroundColor: theme.panelBg, borderBottom: `1px solid ${theme.panelBorder}` }}>
      <div className="flex justify-self-start items-center gap-1.5 text-[10px]">
        <span className="rounded px-2 py-0.5" style={chipStyle}>{run.environment}</span>
        <span className="rounded px-2 py-0.5" style={{ ...chipStyle, backgroundColor: theme.surfaceGreen, color: theme.success }}>{run.scope}</span>
        <span className="rounded px-2 py-0.5" style={chipStyle}>tenant: {run.tenant}</span>
      </div>
      <div className="flex justify-self-center items-center gap-3 text-[11px]" style={{ color: theme.textSecondary }}>
        <span className="rounded px-2 py-0.5" style={{ backgroundColor: theme.surfaceBlue, border: `1px solid ${theme.surfaceBlueBorder}`, color: theme.primaryStrong, fontWeight: 600 }}>{run.status}</span>
        <span>⚙ p95 {run.metrics.p95Ms}ms</span><span>⚡ tok {run.metrics.tokenCount}</span><span>$ {run.metrics.costUsd}</span>
      </div>
      <div className="flex justify-self-end items-center gap-1.5 text-[11px]"><span className="rounded px-2 py-0.5" style={{ ...chipStyle, backgroundColor: theme.surfaceWarning, borderColor: theme.warningBorder, color: theme.warning }}>{run.approval.pendingCount} approval pending</span></div>
    </header>
  );
}
