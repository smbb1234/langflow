import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, TraceTab } from "../types";

const TAB_LABELS: Record<TraceTab, string> = {
  timeline: "Timeline",
  raw: "Raw events",
  guardrails: "Guardrails",
  retries: "Retries / latency",
};

const FALLBACK_TABS: TraceTab[] = ["timeline", "raw", "guardrails", "retries"];

type TraceConsoleHeaderProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  activeTab: TraceTab;
  collapsed: boolean;
  onTabChange: (tab: TraceTab) => void;
  onToggleCollapsed: () => void;
};

export function TraceConsoleHeader({ run, theme, activeTab, collapsed, onTabChange, onToggleCollapsed }: TraceConsoleHeaderProps) {
  const stats = [
    { id: "retries", text: `${run.metrics.retryCount} retries`, bg: theme.surfaceBlue, border: theme.surfaceBlueBorder, color: theme.primaryStrong },
    { id: "spike", text: `${run.metrics.spikeCount} spike`, bg: theme.surfaceWarning, border: theme.warningBorder, color: theme.warning },
    { id: "events", text: `${run.metrics.eventCount} events`, bg: theme.pillBg, border: theme.pillBorder, color: theme.textSecondary },
  ];

  return (
    <div className="border-b px-3 py-2 text-xs" style={{ borderColor: theme.panelBorder, color: theme.textSecondary }}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="agent-workspace-hide-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap pr-1">
          <button
            aria-label={collapsed ? "Expand trace console" : "Collapse trace console"}
            className="rounded px-1 py-0.5 text-xs"
            onClick={onToggleCollapsed}
            style={{ color: theme.textSecondary }}
            type="button"
          >
            {collapsed ? "▶" : "▼"}
          </button>
          <span
            className="rounded-full border px-2 py-1 text-xs font-semibold"
            style={{ backgroundColor: theme.activePanelBg, borderColor: theme.activePanelBorder, color: theme.primaryStrong }}
          >
            Trace Console
          </span>
          {(run.trace.tabs.length ? run.trace.tabs : FALLBACK_TABS).map((tab) => (
            <button
              key={tab}
              aria-label={`Open ${TAB_LABELS[tab]} tab`}
              className="rounded-full border px-2 py-1 text-xs transition-colors"
              onClick={() => onTabChange(tab)}
              style={
                activeTab === tab
                  ? { backgroundColor: theme.activePanelBg, borderColor: theme.activePanelBorder, color: theme.textPrimary }
                  : { backgroundColor: "transparent", borderColor: "transparent", color: theme.textSecondary }
              }
              type="button"
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
        <div className="agent-workspace-hide-scrollbar flex shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-0.5">
          {stats.map((stat) => (
            <span
              key={stat.id}
              className="rounded-full border px-2 py-1 text-xs font-medium"
              style={{ backgroundColor: stat.bg, borderColor: stat.border, color: stat.color }}
            >
              {stat.text}
            </span>
          ))}
          <span className="text-xs" style={{ color: theme.textMuted }}>
            budget {run.metrics.budgetUsedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
