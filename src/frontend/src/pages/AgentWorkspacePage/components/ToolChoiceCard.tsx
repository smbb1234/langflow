import type { AgentWorkspaceRun } from "../types";

export function ToolChoiceCard({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real tool choice/router decision data.
  // TODO: add tool choice metrics with win-rate and fallback usage.
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">
        Tool Selection
      </h2>
      <div className="space-y-2">
        {run.toolChoices.map((tool) => (
          <button
            className="w-full rounded-[10px] bg-[#1a2537] p-2 text-left"
            key={tool.id}
            type="button"
          >
            <p className="text-xs font-medium text-slate-100">{tool.name}</p>
            <p className="text-[11px] text-slate-400">{tool.reason}</p>
            <p className="text-[11px] text-emerald-300">score {tool.score}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
