import type { AgentWorkspaceRun } from "../types";

export function ApprovalCard({ run }: { run: AgentWorkspaceRun }) {
  return (
    <section className="rounded-[14px] border border-amber-300/30 bg-amber-400/10 p-3">
      <h2 className="mb-1 text-sm font-medium text-amber-200">{run.approval.title}</h2>
      <p className="text-xs text-amber-100/90">{run.approval.description}</p>
    </section>
  );
}
