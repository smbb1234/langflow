import type { AgentWorkspaceRun } from "../types";

const STEP_STATUS_SYMBOL: Record<string, string> = {
  DONE: "✓",
  ACTIVE: "→",
  PENDING: "○",
  BLOCKED: "⚠",
};

export function AgentPlanCard({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">
        Execution Plan
      </h2>
      <ul className="space-y-2 text-xs text-slate-300">
        {run.plan.map((step) => (
          <li key={step.id}>
            <span className="mr-2 inline-flex w-4 justify-center text-slate-200">
              {STEP_STATUS_SYMBOL[step.status]}
            </span>
            {step.index}. {step.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
