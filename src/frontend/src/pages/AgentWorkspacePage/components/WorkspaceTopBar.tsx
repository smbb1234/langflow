import { IconBell, IconButton, IconLock, IconShield, IconStopOutline, StatusDot, TopBarDivider, TopBarPill } from "./TopBarParts";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, RunStage, StepStatus } from "../types";

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
const NOOP = () => {};
const STAGE_LABEL_ORDER = ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Respond"] as const;
const TOP_BAR_STAGE_TO_INTERNAL: Record<(typeof STAGE_LABEL_ORDER)[number], string[]> = { Plan: ["Plan", "Intake"], Retrieve: ["Retrieve"], Reason: ["Reason"], Tool: ["Tool", "Actions"], Validate: ["Guardrails", "Validate"], Respond: ["Respond", "Approval"] };
function getStageStatus(stages: RunStage[], candidates: string[]): StepStatus { return stages.find((stage) => candidates.includes(stage.label))?.status ?? "PENDING"; }
function getStageTone(theme: WorkspaceTheme, status: StepStatus) { if (status === "DONE") return { backgroundColor: theme.surfaceGreen, borderColor: "#a7f3d0", color: theme.success }; if (status === "ACTIVE") return { backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong }; if (status === "BLOCKED") return { backgroundColor: theme.surfaceWarning, borderColor: theme.warningBorder, color: theme.warning }; return { backgroundColor: theme.pillBg, borderColor: theme.pillBorder, color: theme.textSecondary }; }

export function WorkspaceTopBar({ run, theme, onCreateRun, onRefresh, onToggleLock, onToggleLayout, onOpenApprovals, onOpenNotifications }: WorkspaceTopBarProps) {
  const notificationCount = 3;
  const normalizedStages = STAGE_LABEL_ORDER.map((stageLabel) => ({ label: stageLabel, status: getStageStatus(run.stages, TOP_BAR_STAGE_TO_INTERNAL[stageLabel]) }));

  return (
    <header className="flex h-[44px] min-w-0 items-center gap-3 overflow-hidden px-4" style={{ backgroundColor: theme.panelBg, borderBottom: `1px solid ${theme.panelBorder}` }}>
      <div className="hide-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto text-[11px]" style={{ color: theme.textSecondary }} aria-label="Top bar run context">
        <TopBarPill theme={theme} style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong }} className="shrink-0 whitespace-nowrap">PROD · us-east-1</TopBarPill>
        <TopBarPill theme={theme} style={{ backgroundColor: theme.surfaceGreen, borderColor: theme.pillBorder, color: theme.success }} className="shrink-0 whitespace-nowrap"><IconLock theme={theme} />finance_ro</TopBarPill>
        <TopBarPill theme={theme} className="shrink-0 whitespace-nowrap">tenant: acme</TopBarPill>
        <TopBarDivider theme={theme} />
        <TopBarPill theme={theme} style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong, fontWeight: 600 }} className="shrink-0 whitespace-nowrap text-[11px]"><StatusDot color={theme.primaryStrong} />RUNNING</TopBarPill>
        <span className="shrink-0 whitespace-nowrap text-[11px] font-medium" style={{ color: theme.textPrimary }}>Q3 revenue analysis</span>
        {normalizedStages.map(({ label, status }) => <TopBarPill key={label} theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]" ariaLabel={`${label} stage, ${status.toLowerCase()}`} ariaCurrent={status === "ACTIVE" ? "step" : undefined} style={getStageTone(theme, status)}>{label}</TopBarPill>)}
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">step 4/6</TopBarPill>
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">00:00:14</TopBarPill>
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">∞ 128</TopBarPill>
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">p95 412ms</TopBarPill>
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">tok 1.2k</TopBarPill>
        <TopBarPill theme={theme} className="h-5 shrink-0 whitespace-nowrap rounded px-1.5 text-[10px]">$ 0.014</TopBarPill>
        <TopBarDivider theme={theme} />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-[11px]" style={{ color: theme.textSecondary }}>
        <IconButton label="Pause run" onClick={onCreateRun ?? NOOP} theme={theme} style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong }}>⏸</IconButton>
        <IconButton label="Refresh run" onClick={onRefresh ?? NOOP} theme={theme}>↻</IconButton>
        <IconButton label="Toggle scope lock" onClick={onToggleLock ?? NOOP} theme={theme}><IconLock theme={theme} /></IconButton>
        <IconButton label="Stop run" onClick={onToggleLayout ?? NOOP} theme={theme} style={{ backgroundColor: "#ffe4e6", borderColor: "#fecdd3", color: "#be123c" }}><IconStopOutline theme={theme} /></IconButton>
        <button type="button" aria-label="Open approvals" onClick={onOpenApprovals ?? NOOP} className="hidden h-6 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-[10px] lg:inline-flex" style={{ backgroundColor: theme.surfaceWarning, border: `1px solid ${theme.warningBorder}`, color: theme.warning }}><IconShield theme={theme} />1 approval pending</button>
        <button type="button" aria-label="Open notifications, 3 unread" onClick={onOpenNotifications ?? NOOP} className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border" style={{ borderColor: theme.pillBorder, backgroundColor: "#ffffff" }}><IconBell theme={theme} /><span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold" style={{ backgroundColor: "#ef4444", color: theme.panelBg }}>{notificationCount}</span></button>
      </div>
    </header>
  );
}
