import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function WorkspaceTopBar({ theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const chipStyle = {
    border: `1px solid ${theme.panelBorder}`,
    color: theme.textSecondary,
    backgroundColor: theme.surfaceMuted,
  };
  return (
    <header
      className="grid h-[44px] grid-cols-[1fr_auto_1fr] items-center px-3"
      style={{ backgroundColor: theme.panelBg, borderBottom: `1px solid ${theme.panelBorder}` }}
    >
      <div className="flex justify-self-start items-center gap-1.5 text-[10px]">
        <span className="rounded px-2 py-0.5" style={chipStyle}>
          PROD · us-east-1
        </span>
        <span className="rounded px-2 py-0.5" style={{ ...chipStyle, backgroundColor: theme.surfaceGreen, color: theme.success }}>
          finance_ro
        </span>
        <span className="rounded px-2 py-0.5" style={chipStyle}>
          tenant: acme
        </span>
      </div>
      <div className="flex justify-self-center items-center gap-3 text-[11px]" style={{ color: theme.textSecondary }}>
        <span
          className="rounded px-2 py-0.5"
          style={{
            backgroundColor: theme.surfaceBlue,
            border: `1px solid ${theme.surfaceBlueBorder}`,
            color: theme.primaryStrong,
            fontWeight: 600,
          }}
        >
          RUNNING
        </span>
        <span>∞ 00</span>
        <span>⚙ p95 412ms</span>
        <span>⚡ tok 1.2k</span>
        <span>$ 0.014</span>
      </div>
      <div className="flex justify-self-end items-center gap-1.5 text-[11px]">
        {["⊞", "↻", "🔒", "◻"].map((x) => (
          <button key={x} type="button" className="rounded px-2 py-0.5" style={chipStyle}>
            {x}
          </button>
        ))}
        <span
          className="rounded px-2 py-0.5"
          style={{ ...chipStyle, backgroundColor: theme.surfaceWarning, borderColor: theme.warning, color: theme.warning }}
        >
          1 approval pending
        </span>
        <span className="rounded px-2 py-0.5" style={chipStyle}>
          🔔 3
        </span>
      </div>
    </header>
  );
}
