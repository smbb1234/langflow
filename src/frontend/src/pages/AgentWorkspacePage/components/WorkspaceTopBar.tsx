import { JaiLogo } from "@/components/jai/JaiLogo";
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
  const stageLabelOrder = ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Respond"];
  const stagesByLabel = new Map(run.stages.map((stage) => [stage.label.toLowerCase(), stage]));

  const normalizedStages = stageLabelOrder.map((label) => {
    const mappedLabel = label === "Validate" ? "guardrails" : label;
    const stage = stagesByLabel.get(mappedLabel.toLowerCase());

    return {
      id: stage?.id ?? `stage-${label.toLowerCase()}`,
      label,
      status: stage?.status ?? "PENDING",
    };
  });

  const statusStyleByStage = {
    DONE: { backgroundColor: theme.surfaceGreen, borderColor: theme.pillBorder, color: theme.success },
    ACTIVE: { backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong },
    PENDING: { backgroundColor: theme.pillBg, borderColor: theme.pillBorder, color: theme.textSecondary },
    BLOCKED: { backgroundColor: theme.surfaceWarning, borderColor: theme.warningBorder, color: theme.warning },
  } as const;

  const toSeconds = (value: string) => {
    const [hh, mm, ss] = value.split(":").map(Number);
    if ([hh, mm, ss].some(Number.isNaN)) return null;
    return hh * 3600 + mm * 60 + ss;
  };

  const startedAtSeconds = toSeconds(run.startedAt);
  const lastEventTimestamp = run.events.at(-1)?.timestamp;
  const lastEventSeconds = lastEventTimestamp ? toSeconds(lastEventTimestamp) : null;
  const elapsedSeconds = startedAtSeconds !== null && lastEventSeconds !== null ? Math.max(lastEventSeconds - startedAtSeconds, 0) : 0;
  const elapsedLabel = new Date(elapsedSeconds * 1000).toISOString().slice(11, 19);

  return (
    <header
      className="flex h-[44px] min-w-0 items-center gap-3 overflow-hidden px-4"
      style={{ backgroundColor: theme.panelBg, borderBottom: `1px solid ${theme.panelBorder}` }}
    >
      <div className="flex min-w-0 shrink-0 items-center gap-1.5">
        <JaiLogo className="hidden h-8 w-[139px] shrink-0 md:block lg:h-10 lg:w-[174px]" />
        <div className="hidden h-6 w-2 shrink-0 md:block" aria-hidden="true" />
        <TopBarPill theme={theme}>{run.environment}</TopBarPill>
        <TopBarPill
          theme={theme}
          style={{ backgroundColor: theme.surfaceGreen, borderColor: theme.pillBorder, color: theme.success }}
        >
          <IconLock theme={theme} />
          {run.scope}
        </TopBarPill>
        <TopBarPill theme={theme} className="hidden xl:inline-flex">tenant: {run.tenant}</TopBarPill>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-[11px]" style={{ color: theme.textSecondary }}>
        <TopBarPill
          theme={theme}
          style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong, fontWeight: 600 }}
          className="text-[10px]"
        >
          <StatusDot color={theme.primaryStrong} />
          {run.status}
        </TopBarPill>
        <span className="min-w-0 flex-1 truncate text-[11px]" style={{ color: theme.textPrimary }}>{run.title}</span>
        <div className="hidden shrink-0 items-center gap-1.5 2xl:flex">
          {normalizedStages.map((stage) => (
            <TopBarPill key={stage.id} theme={theme} style={statusStyleByStage[stage.status]} className="text-[10px]">
              {stage.label}
            </TopBarPill>
          ))}
        </div>
        <span className="hidden shrink-0 xl:inline">step {run.currentStep}/{run.totalSteps} | {elapsedLabel}</span>
        <span className="hidden shrink-0 lg:inline">∞ {String(run.metrics.eventCount).padStart(2, "0")}</span>
        <span className="hidden shrink-0 xl:inline">p95 {run.metrics.p95Ms}ms</span>
        <span className="hidden shrink-0 2xl:inline">tok {tokenLabel}</span>
        <span className="hidden shrink-0 2xl:inline">$ {run.metrics.costUsd.toFixed(3)}</span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-[11px]" style={{ color: theme.textSecondary }}>
        <IconButton label="Create run" onClick={onCreateRun ?? NOOP} theme={theme}>⊞</IconButton>
        <IconButton label="Refresh run" onClick={onRefresh ?? NOOP} theme={theme}>↻</IconButton>
        <IconButton label="Toggle scope lock" onClick={onToggleLock ?? NOOP} theme={theme}><IconLock theme={theme} /></IconButton>
        <IconButton label="Toggle layout" onClick={onToggleLayout ?? NOOP} theme={theme}>◫</IconButton>

        <button
          type="button"
          aria-label="Open approvals"
          onClick={onOpenApprovals ?? NOOP}
          className="hidden h-6 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-[10px] lg:inline-flex"
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
          className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
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
