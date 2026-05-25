import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function RunInspectorPanel({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  // TODO: replace mock approval with real approval workflow.
  return <aside className="h-full w-[380px] overflow-y-auto border-l" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}><div className="space-y-4 px-4 py-4 text-[12px]"><p>Run ID: {run.runDisplayId}</p><p>Started: {run.startedAt}</p><p>Active agent: {run.agentName}</p><p>Stage: {run.currentStep}/{run.totalSteps}</p><p>Approval: {run.approval.title}</p><p>Uncertainty: {run.uncertainty.confidence}</p><p>Evidence: {run.evidence.source}</p></div></aside>;
}
