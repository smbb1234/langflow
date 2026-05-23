import type { AgentWorkspaceRun } from "../types";

export function WorkspaceTopBar({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real agent runtime API.
  // TODO: add run history switcher and saved session timeline in top bar.
  return (
    <header className="flex h-[56px] items-center justify-between border-b border-white/10 bg-[#0f1724] px-4 lg:px-6">
      <div>
        <p className="text-xs text-slate-400">Agent Workspace</p>
        <h1 className="text-sm font-semibold text-slate-100 lg:text-base">
          {run.title}
        </h1>
        <p className="text-[11px] text-slate-400">{run.agentName}</p>
      </div>
      <div className="rounded-[10px] border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
        {run.status} / {run.mode} / step {run.currentStep}/{run.totalSteps}
      </div>
      <nav
        aria-label="Workspace top tabs"
        className="flex gap-2"
        role="tablist"
      >
        <button
          aria-selected={true}
          className="text-xs text-slate-100"
          role="tab"
          type="button"
        >
          Overview
        </button>
        <button
          aria-selected={false}
          className="text-xs text-slate-400"
          role="tab"
          type="button"
        >
          History
        </button>
      </nav>
    </header>
  );
}
