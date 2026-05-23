import type { AgentWorkspaceRun } from "../types";
import { ApprovalCard } from "./ApprovalCard";
import { UncertaintyCard } from "./UncertaintyCard";

export function RunInspectorPanel({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real guardrail/evidence/trace API.
  return (
    <aside className="h-full overflow-y-auto border-l border-white/10 bg-[#0d1522] p-3 lg:w-[320px]">
      <div className="space-y-3">
        <ApprovalCard run={run} />
        <UncertaintyCard run={run} />
        <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
          <h2 className="mb-1 text-sm font-medium text-slate-100">Evidence</h2>
          {run.evidence.map((item) => (
            <p className="text-xs text-slate-300" key={item.id}>
              {item.source}: {item.detail}
            </p>
          ))}
        </section>
      </div>
    </aside>
  );
}
