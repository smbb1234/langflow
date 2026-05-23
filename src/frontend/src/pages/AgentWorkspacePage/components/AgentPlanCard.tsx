import type { AgentWorkspaceRun } from "../types";

export function AgentPlanCard({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">Execution Plan</h2>
      <ul className="space-y-2 text-xs text-slate-300">
        {run.plan.map((step) => (
          <li key={step.id}>{step.index}. {step.label} ({step.status})</li>
        ))}
      </ul>
    </section>
  );
}
