import {
  IconBell,
  IconButton,
  IconLock,
  StatusDot,
  TopBarPill,
} from "./TopBarParts";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

type WorkspaceTopBarProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  onCreateRun?: () => void;
  onRefresh?: () => void;
  onToggleLock?: () => void;
  onToggleLayout?: () => void;
  onOpenApprovals?: () => void;
  onOpenNotifications?: () => void;
};

const NOOP = () => {
  // TODO: wire this action to real run controls when backend actions are available.
};

export function WorkspaceTopBar({
  run,
  theme,
  onCreateRun,
  onRefresh,
  onToggleLock,
  onToggleLayout,
  onOpenApprovals,
  onOpenNotifications,
}: WorkspaceTopBarProps) {
  const tokenLabel = Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(run.metrics.tokenCount);
  const notificationCount = run.metrics.retryCount;

  return (
    <header
      className="grid h-[44px] grid-cols-[1fr_auto_1fr] items-center px-4"
      style={{ backgroundColor: theme.panelBg, borderBottom: `1px solid ${theme.panelBorder}` }}
    >
      <div className="flex items-center justify-self-start gap-1.5">
        <TopBarPill theme={theme}>{run.environment}</TopBarPill>
        <TopBarPill
          theme={theme}
          style={{ backgroundColor: theme.surfaceGreen, borderColor: theme.pillBorder, color: theme.success }}
        >
          <IconLock theme={theme} />
          {run.scope}
        </TopBarPill>
        <TopBarPill theme={theme}>tenant: {run.tenant}</TopBarPill>
      </div>

      <div className="flex items-center justify-self-center gap-2 text-[11px]" style={{ color: theme.textSecondary }}>
        <TopBarPill
          theme={theme}
          style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong, fontWeight: 600 }}
          className="text-[10px]"
        >
          <StatusDot color={theme.primaryStrong} />
          {run.status}
        </TopBarPill>
        <span>∞ {String(run.metrics.eventCount).padStart(2, "0")}</span>
        <span>p95 {run.metrics.p95Ms}ms</span>
        <span>tok {tokenLabel}</span>
        <span>$ {run.metrics.costUsd.toFixed(3)}</span>
      </div>

      <div className="flex items-center justify-self-end gap-1.5 text-[11px]" style={{ color: theme.textSecondary }}>
        <IconButton label="Create run" onClick={onCreateRun ?? NOOP} theme={theme}>⊞</IconButton>
        <IconButton label="Refresh run" onClick={onRefresh ?? NOOP} theme={theme}>↻</IconButton>
        <IconButton label="Toggle scope lock" onClick={onToggleLock ?? NOOP} theme={theme}><IconLock theme={theme} /></IconButton>
        <IconButton label="Toggle layout" onClick={onToggleLayout ?? NOOP} theme={theme}>◫</IconButton>

        <button
          type="button"
          aria-label="Open approvals"
          onClick={onOpenApprovals ?? NOOP}
          className="inline-flex h-6 items-center rounded-md px-2 text-[10px]"
          style={{
            backgroundColor: theme.surfaceWarning,
            border: `1px solid ${theme.warningBorder}`,
            color: theme.warning,
          }}
        >
          <StatusDot color={theme.warning} />
          {run.approval.pendingCount} approval pending
        </button>

        <button
          type="button"
          aria-label="Open notifications"
          onClick={onOpenNotifications ?? NOOP}
          className="relative inline-flex h-6 w-6 items-center justify-center rounded-md border"
          style={{ borderColor: theme.pillBorder, backgroundColor: theme.pillBg }}
        >
          <IconBell theme={theme} />
          <span
            className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold"
            style={{ backgroundColor: theme.primaryStrong, color: theme.panelBg }}
          >
            {notificationCount}
          </span>
        </button>
      </div>
    </header>
  );
}
