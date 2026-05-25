import { useMemo, useState } from "react";

import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, TraceTab } from "../types";
import { TraceConsoleHeader } from "./TraceConsoleHeader";
import { TraceGuardrailsView } from "./TraceGuardrailsView";
import { TraceRawEvents } from "./TraceRawEvents";
import { TraceRetriesView } from "./TraceRetriesView";
import { TraceTimeline } from "./TraceTimeline";

type TraceConsoleBarProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  defaultTab?: TraceTab;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onTraceTabChange?: (tab: TraceTab) => void;
  onToggleCollapsed?: (collapsed: boolean) => void;
};

const FALLBACK_TABS: TraceTab[] = ["timeline", "raw", "guardrails", "retries"];

export function TraceConsoleBar({
  run,
  theme,
  defaultTab,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onTraceTabChange,
  onToggleCollapsed,
}: TraceConsoleBarProps) {
  const availableTabs = run.trace.tabs.length ? run.trace.tabs : FALLBACK_TABS;
  const initialTab = useMemo(() => {
    if (defaultTab && availableTabs.includes(defaultTab)) {
      return defaultTab;
    }
    if (availableTabs.includes(run.trace.activeTab)) {
      return run.trace.activeTab;
    }
    return availableTabs[0] ?? "timeline";
  }, [availableTabs, defaultTab, run.trace.activeTab]);

  const [activeTab, setActiveTab] = useState<TraceTab>(initialTab);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? internalCollapsed;

  const handleTabChange = (tab: TraceTab) => {
    setActiveTab(tab);
    onTraceTabChange?.(tab);
  };

  const handleToggleCollapsed = () => {
    const nextCollapsed = !collapsed;
    setInternalCollapsed(nextCollapsed);
    onToggleCollapsed?.(nextCollapsed);
  };

  return (
    <footer className="h-full border-t" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
      <TraceConsoleHeader
        activeTab={activeTab}
        collapsed={collapsed}
        onTabChange={handleTabChange}
        onToggleCollapsed={handleToggleCollapsed}
        run={run}
        theme={theme}
      />
      {!collapsed && activeTab === "timeline" && <TraceTimeline run={run} theme={theme} />}
      {!collapsed && activeTab === "raw" && <TraceRawEvents run={run} theme={theme} />}
      {!collapsed && activeTab === "guardrails" && <TraceGuardrailsView run={run} theme={theme} />}
      {!collapsed && activeTab === "retries" && <TraceRetriesView run={run} theme={theme} />}
    </footer>
  );
}
