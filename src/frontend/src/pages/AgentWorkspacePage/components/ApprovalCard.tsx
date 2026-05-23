import { useState } from "react";

import type { AgentWorkspaceRun } from "../types";

export function ApprovalCard({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect approval actions to backend once available.
  const [localDecision, setLocalDecision] = useState<
    "review" | "approved" | "denied" | null
  >(null);

  return (
    <section className="rounded-[14px] border border-amber-300/30 bg-amber-400/10 p-3">
      <h2 className="mb-1 text-sm font-medium text-amber-200">
        {run.approval.title}
      </h2>
      <p className="text-xs text-amber-100/90">{run.approval.description}</p>
      <p className="mt-2 text-[11px] text-amber-100/80">
        Local status: {localDecision ?? "none"}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded-[10px] border border-amber-200/30 px-2 py-1 text-xs text-amber-100"
          type="button"
          onClick={() => setLocalDecision("review")}
        >
          Review
        </button>
        <button
          className="rounded-[10px] bg-emerald-500/20 px-2 py-1 text-xs text-emerald-100"
          type="button"
          onClick={() => setLocalDecision("approved")}
        >
          Approve
        </button>
        <button
          className="rounded-[10px] bg-rose-500/20 px-2 py-1 text-xs text-rose-100"
          type="button"
          onClick={() => setLocalDecision("denied")}
        >
          Deny
        </button>
      </div>
    </section>
  );
}
