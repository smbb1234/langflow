import type { AgentWorkspaceRun } from "../types";
import { ApprovalCard } from "./ApprovalCard";
import { UncertaintyCard } from "./UncertaintyCard";

export function RunInspectorPanel({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real guardrail/evidence/trace/approval APIs.
  const currentRunItems = [
    { label: "Run ID", value: run.id },
    { label: "Started", value: run.startedAt },
    { label: "Active agent", value: run.activeAgent },
    { label: "Stage", value: run.stage },
    { label: "Next checkpoint", value: "Guardrail validation" },
    { label: "Initiated by", value: "Workspace operator" },
  ];

  const unresolvedItems = [
    {
      id: "guardrail-1",
      level: "warning",
      text: "PII mask confidence below threshold in draft answer.",
    },
    {
      id: "evidence-1",
      level: "error",
      text: "Evidence source for policy quote is missing citation anchor.",
    },
  ] as const;

  return (
    <aside className="order-last h-full overflow-y-auto border-l border-white/10 bg-[#0d1522] p-3 md:w-[300px] lg:w-[336px]">
      <div className="space-y-3">
        <nav
          aria-label="Inspector tabs"
          className="flex gap-2 rounded-[12px] border border-white/10 bg-[#121b2b] p-1"
          role="tablist"
        >
          {[
            { label: "Overview", selected: true },
            { label: "Guardrails", selected: false },
            { label: "Evidence", selected: false },
            { label: "Trace", selected: false },
          ].map((tab) => (
            <button
              aria-selected={tab.selected}
              className={`rounded-md px-2 py-1 text-xs ${tab.selected ? "bg-slate-200/10 text-slate-100" : "text-slate-400"}`}
              key={tab.label}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
          <h2 className="mb-2 text-sm font-medium text-slate-100">
            Current run
          </h2>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
            {currentRunItems.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">
                  {item.label}
                </dt>
                <dd className="text-xs text-slate-200">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ApprovalCard run={run} />
        <UncertaintyCard run={run} />

        <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
          <h2 className="mb-2 text-sm font-medium text-slate-100">
            Blocked / unresolved
          </h2>
          <ul className="space-y-2">
            {unresolvedItems.map((item) => (
              <li
                className="flex items-start gap-2 text-xs text-slate-200"
                key={item.id}
              >
                <span
                  className={`mt-1 inline-block h-2 w-2 rounded-full ${item.level === "error" ? "bg-rose-400" : "bg-amber-400"}`}
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
          <h2 className="mb-2 text-sm font-medium text-slate-100">
            Tool choice (compact)
          </h2>
          <dl className="space-y-2 text-xs">
            <div>
              <dt className="text-slate-400">Picked</dt>
              <dd className="text-slate-200">Web search + retrieval rerank</dd>
            </div>
            <div>
              <dt className="text-slate-400">Rejected</dt>
              <dd className="text-slate-200">Database migration utility</dd>
            </div>
            <div>
              <dt className="text-slate-400">Reason</dt>
              <dd className="text-slate-200">
                Need fresh sources; no schema changes required.
              </dd>
            </div>
          </dl>
        </section>

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
