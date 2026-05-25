import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceConsoleBar({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  // TODO: fetch trace events from run execution API.
  return <footer className="h-[162px] border-t" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
    <div className="flex h-[41px] items-center justify-between border-b px-3 text-[11px]" style={{ borderColor: theme.panelBorder, color: theme.textSecondary }}>
      <div className="flex gap-3"><span>Trace Console</span>{run.trace.tabs.map((tab)=><span key={tab}>{tab}</span>)}</div>
      <div className="flex gap-3"><span>{run.metrics.retryCount} retries</span><span>{run.metrics.spikeCount} spike</span><span>{run.metrics.eventCount} events</span><span>budget {run.metrics.budgetUsedLabel}</span></div>
    </div>
  </footer>;
}
