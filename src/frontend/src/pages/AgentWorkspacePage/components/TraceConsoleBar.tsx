import type { AgentWorkspaceRun } from "../types";

export function TraceConsoleBar({ run }: { run: AgentWorkspaceRun }) {
  return (
    <footer className="flex h-[64px] items-center justify-between border-t border-white/10 bg-[#0f1724] px-4 lg:px-6">
      <div className="text-xs text-slate-400">
        <p>{run.trace.eventsLabel}</p>
        <p>tabs: {run.trace.tabs.join(" / ")}</p>
      </div>
      <p className="text-[11px] text-slate-300">
        p95 {run.metrics.p95Ms}ms · tok {run.metrics.tokenCount} · cost ${run.metrics.costUsd} · events {run.metrics.eventCount} · retry {run.metrics.retryCount} · budget {run.metrics.budgetUsedPct}%
      </p>
    </footer>
  );
}
