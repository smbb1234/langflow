import { useMemo } from "react";

import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, WorkspaceTab } from "../types";
import { BlockedSection } from "./BlockedSection";
import { CurrentRunSection } from "./CurrentRunSection";
import { EvidenceSection } from "./EvidenceSection";
import { GuardrailsSection } from "./GuardrailsSection";
import { InspectorTabs } from "./InspectorTabs";
import { MemorySection } from "./MemorySection";
import { OpsSection } from "./OpsSection";
import { ToolChoiceCard } from "./ToolChoiceCard";
import { TraceSummarySection } from "./TraceSummarySection";
import { UncertaintySection } from "./UncertaintySection";

type RunInspectorPanelProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  onReviewApproval?: (approvalId: string) => void;
};

export function RunInspectorPanel({ run, theme, activeTab, onTabChange }: RunInspectorPanelProps) {
  const content = useMemo(() => {
    if (activeTab === "guardrails") return <GuardrailsSection run={run} theme={theme} />;
    if (activeTab === "evidence") return <EvidenceSection run={run} theme={theme} />;
    if (activeTab === "trace") return <TraceSummarySection run={run} theme={theme} />;
    if (activeTab === "memory") return <MemorySection run={run} theme={theme} />;
    if (activeTab === "ops") return <OpsSection run={run} theme={theme} />;
    return (
      <>
        <CurrentRunSection run={run} theme={theme} />
        <BlockedSection run={run} theme={theme} />
        <UncertaintySection run={run} theme={theme} />
        <ToolChoiceCard toolChoices={run.toolChoices} theme={theme} compact />
      </>
    );
  }, [activeTab, run, theme]);

  const tabDots = useMemo(
    () => ({
      guardrails: run.guardrailChecks.some((check) => check.status === "warning" || check.status === "failed"),
    }),
    [run.guardrailChecks],
  );

  return (
    <aside className="h-full w-[360px] shrink-0 overflow-hidden border-l" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
      <InspectorTabs activeTab={activeTab} onTabChange={onTabChange} theme={theme} tabDots={tabDots} />
      <div className="h-[calc(100%-39px)] min-h-0 space-y-3 overflow-y-auto p-4 text-sm">{content}</div>
    </aside>
  );
}
