import { Download, GitBranch, MoreHorizontal } from "lucide-react";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

type RunHeaderProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  onBranchRun?: () => void;
  onExportRun?: () => void;
  onOpenRunMenu?: () => void;
};

export function RunHeader({
  run: _run,
  theme,
  onBranchRun,
  onExportRun,
  onOpenRunMenu,
}: RunHeaderProps) {
  const chip = {
    backgroundColor: theme.pillBg,
    border: `1px solid ${theme.pillBorder}`,
    color: theme.textSecondary,
  };

  return (
    <header
      className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-2"
      style={{ borderColor: theme.panelBorder }}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <h1
          className="max-w-full truncate text-[14px] font-semibold"
          style={{ color: theme.textPrimary }}
        >
          Q3 revenue analysis
        </h1>
        <span className="rounded-full px-2 py-0.5 text-[11px]" style={chip}>
          run · _8f2c14a
        </span>
        <span
          className="min-w-0 max-w-full truncate rounded-full border px-2 py-0.5 text-[11px] sm:max-w-[65%]"
          style={{
            backgroundColor: theme.surfaceBlue,
            borderColor: theme.surfaceBlueBorder,
            color: theme.primaryStrong,
          }}
        >
          finance_sql_agent → chart_agent
        </span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12px]"
          style={{
            borderColor: theme.panelBorder,
            color: theme.textSecondary,
            backgroundColor: theme.surface,
          }}
          onClick={() => {
            // TODO: wire real branch run action.
            onBranchRun?.();
          }}
          type="button"
        >
          <GitBranch size={14} aria-hidden="true" />
          Branch
        </button>
        <button
          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12px]"
          style={{
            borderColor: theme.panelBorder,
            color: theme.textSecondary,
            backgroundColor: theme.surface,
          }}
          onClick={() => {
            // TODO: wire real export run action.
            onExportRun?.();
          }}
          type="button"
        >
          <Download size={14} aria-hidden="true" />
          Export
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-[14px] leading-none"
          style={{
            borderColor: theme.panelBorder,
            color: theme.textSecondary,
            backgroundColor: theme.surface,
          }}
          onClick={() => {
            // TODO: wire real run menu.
            onOpenRunMenu?.();
          }}
          type="button"
          aria-label="Open run menu"
        >
          <MoreHorizontal size={16} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
