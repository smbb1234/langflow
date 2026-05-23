import type { AgentWorkspaceRun } from "../types";

export function TraceConsoleBar({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real guardrail/evidence/trace API.
  // TODO: add expanded console drawer with sticky filters and persisted tab state.
  return (
    <footer className="flex h-[64px] items-center justify-between border-t border-white/10 bg-[#0f1724] px-4 lg:px-6">
      <div className="text-xs text-slate-400">
        <p>{run.trace.eventsLabel}</p>
        <nav aria-label="Trace tabs" className="flex gap-2" role="tablist">
          {run.trace.tabs.map((tab) => (
            <button
              aria-selected={run.trace.activeTab === tab}
              className="text-[11px]"
              key={tab}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <p className="text-[11px] text-slate-300">
        <span aria-hidden="true">• </span>
        p95 {run.metrics.p95Ms}ms · tok {run.metrics.tokenCount} · cost $
        {run.metrics.costUsd} · events {run.metrics.eventCount} · retry{" "}
        {run.metrics.retryCount} · budget {run.metrics.budgetUsedPct}%
      </p>
    </footer>
  );
}
