import type { AgentWorkspaceRun } from "../types";

export function ToolChoiceCard({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">Tool Selection</h2>
      <div className="space-y-2">
        {run.toolChoices.map((tool) => (
          <div className="rounded-[10px] bg-[#1a2537] p-2" key={tool.id}>
            <p className="text-xs font-medium text-slate-100">{tool.name}</p>
            <p className="text-[11px] text-slate-400">{tool.reason}</p>
            <p className="text-[11px] text-emerald-300">score {tool.score}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
