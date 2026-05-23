import type { AgentWorkspaceRun } from "../types";

export function RunStageProgress({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="border-b border-white/10 px-4 py-3 lg:px-6">
      <div
        aria-label="Main stage tabs"
        className="grid gap-2 sm:grid-cols-3"
        role="tablist"
      >
        {run.stages.map((stage) => (
          <button
            aria-selected={stage.status === "ACTIVE"}
            className="rounded-[12px] border border-white/10 bg-[#111b2b] px-3 py-2"
            key={stage.id}
            role="tab"
            type="button"
          >
            <p className="text-[11px] text-slate-400">{stage.status}</p>
            <p className="text-sm text-slate-100">{stage.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
