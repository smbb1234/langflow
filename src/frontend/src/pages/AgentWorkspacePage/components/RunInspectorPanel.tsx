import { useMemo, useState } from "react";

import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, WorkspaceTab } from "../types";
import { BlockedSection } from "./BlockedSection";
import { CurrentRunSection } from "./CurrentRunSection";
import { EvidenceSection } from "./EvidenceSection";
import { GuardrailsSection } from "./GuardrailsSection";
import { InspectorTabs } from "./InspectorTabs";
import { TraceSummarySection } from "./TraceSummarySection";
import { UncertaintySection } from "./UncertaintySection";

type RunInspectorPanelProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
  onReviewApproval?: (approvalId: string) => void;
};

export function RunInspectorPanel({ run, theme, activeTab, onTabChange }: RunInspectorPanelProps) {
  const [localTab, setLocalTab] = useState<WorkspaceTab>("overview");
  const resolvedTab = activeTab ?? localTab;

  const handleTabChange = (tab: WorkspaceTab) => {
    setLocalTab(tab);
    onTabChange?.(tab);
  };

  const content = useMemo(() => {
    if (resolvedTab === "guardrails") return <GuardrailsSection run={run} theme={theme} />;
    if (resolvedTab === "evidence") return <EvidenceSection run={run} theme={theme} />;
    if (resolvedTab === "trace") return <TraceSummarySection run={run} theme={theme} />;
    return (
      <>
        <CurrentRunSection run={run} theme={theme} />
        <BlockedSection theme={theme} />
        <UncertaintySection theme={theme} />
      </>
    );
  }, [resolvedTab, run, theme]);

  return (
    <aside className="h-full w-[380px] shrink-0 overflow-hidden border-l" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
      <InspectorTabs activeTab={resolvedTab} onTabChange={handleTabChange} theme={theme} />
      <div className="h-[calc(100%-39px)] space-y-3 overflow-y-auto p-4">{content}</div>
    </aside>
  );
}
