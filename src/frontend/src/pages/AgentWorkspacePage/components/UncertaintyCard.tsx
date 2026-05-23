import type { AgentWorkspaceRun } from "../types";

export function UncertaintyCard({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="rounded-[14px] border border-indigo-300/30 bg-indigo-400/10 p-3">
      <h2 className="mb-1 text-sm font-medium text-indigo-200">Uncertainty</h2>
      <p className="text-xs text-indigo-100/90">{run.uncertainty.summary}</p>
      <p className="mt-2 text-[11px] text-indigo-200">confidence {run.uncertainty.confidence}</p>
    </section>
  );
}
