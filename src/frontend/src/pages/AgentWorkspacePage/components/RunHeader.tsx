import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

type RunHeaderProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  onBranchRun?: () => void;
  onExportRun?: () => void;
  onOpenRunMenu?: () => void;
};

export function RunHeader({ run, theme, onBranchRun, onExportRun, onOpenRunMenu }: RunHeaderProps) {
  const chip = { backgroundColor: theme.pillBg, border: `1px solid ${theme.pillBorder}`, color: theme.textSecondary };

  return (
    <header className="flex h-[60px] items-center justify-between border-b px-4" style={{ borderColor: theme.panelBorder }}>
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate text-[16px] font-semibold" style={{ color: theme.textPrimary }}>
          {run.title}
        </h1>
        <span className="rounded-full px-2 py-0.5 text-[11px]" style={chip}>
          run · {run.runDisplayId}
        </span>
        <span
          className="truncate rounded-full border px-2 py-0.5 text-[11px]"
          style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong }}
        >
          {run.agentPath}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-md border px-2.5 py-1 text-[12px]"
          style={{ borderColor: theme.panelBorder, color: theme.textSecondary, backgroundColor: theme.surface }}
          onClick={() => {
            // TODO: wire real branch run action.
            onBranchRun?.();
          }}
          type="button"
        >
          Branch
        </button>
        <button
          className="rounded-md border px-2.5 py-1 text-[12px]"
          style={{ borderColor: theme.panelBorder, color: theme.textSecondary, backgroundColor: theme.surface }}
          onClick={() => {
            // TODO: wire real export run action.
            onExportRun?.();
          }}
          type="button"
        >
          Export
        </button>
        <button
          className="rounded-md border px-2.5 py-1 text-[14px] leading-none"
          style={{ borderColor: theme.panelBorder, color: theme.textSecondary, backgroundColor: theme.surface }}
          onClick={() => {
            // TODO: wire real run menu.
            onOpenRunMenu?.();
          }}
          type="button"
          aria-label="Open run menu"
        >
          ⋯
        </button>
      </div>
    </header>
  );
}
