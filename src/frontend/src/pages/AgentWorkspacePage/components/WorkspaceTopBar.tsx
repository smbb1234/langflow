import type { AgentWorkspaceRun } from "../types";

const stageChips = ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Response"];

export function WorkspaceTopBar({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real runtime/token/cost API.
  return (
    <header className="flex h-[56px] items-center justify-between border-b border-[#1e293b] bg-[#070d14] px-4 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-slate-300">
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            PROD · us-east-1
          </span>
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            finance_ro
          </span>
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            tenant: acme
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-[11px] text-slate-200">
          <span className="shrink-0 font-semibold tracking-wide text-emerald-300">
            RUNNING
          </span>
          <span className="min-w-0 truncate text-slate-100">{run.title}</span>
          <div className="hidden shrink-0 items-center gap-1 xl:flex">
            {stageChips.map((stage) => (
              <span
                className="rounded-md border border-slate-700/80 px-1.5 py-0.5 text-[10px] text-slate-300"
                key={stage}
              >
                {stage}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-slate-400">
            step {run.currentStep}/{run.totalSteps}
          </span>
          <span className="shrink-0 text-slate-400">02:13</span>
        </div>
      </div>

      <div className="ml-3 flex max-w-[320px] flex-wrap items-center justify-end gap-1.5 text-[11px]">
        <span className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200">
          p95 412ms
        </span>
        <span className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200">
          tok 1.2k
        </span>
        <span className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200">
          $0.014
        </span>
        <span className="rounded-md border border-amber-500/70 bg-amber-500/10 px-2 py-0.5 text-amber-300">
          1 approval pending
        </span>
      </div>
    </header>
  );
}
