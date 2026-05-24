import type { AgentWorkspaceRun } from "../types";
import { MOCK_AGENT_WORKSPACE_COPY } from "../constants";
import { WORKSPACE_UI } from "../ui";
import { ApprovalCard } from "./ApprovalCard";
import { UncertaintyCard } from "./UncertaintyCard";

export function RunInspectorPanel({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real guardrail/evidence/trace API.
  const currentRunItems = [
    { label: "Run ID", value: run.id },
    { label: "Status", value: run.status },
    { label: "Active agent", value: run.agentName },
    { label: "Stage", value: run.stages.find((stage) => stage.status === "ACTIVE")?.label ?? "N/A" },
    { label: "Next checkpoint", value: run.plan.find((step) => step.status === "PENDING")?.label ?? "Final review" },
    { label: "Guardrails", value: `${run.guardrails.total} checks` },
  ];

  return (
    <aside
      className={`order-last h-full min-h-0 overflow-y-auto border-l border-white/10 ${WORKSPACE_UI.panelBg} p-[14px] md:w-[300px] lg:w-[336px]`}
    >
      <div className="space-y-3">
        <nav
          aria-label="Inspector tabs"
          className={`flex gap-2 ${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} p-1`}
          role="tablist"
        >
          {MOCK_AGENT_WORKSPACE_COPY.inspectorTabs.map((tab, index) => (
            <button
              aria-selected={index === 0}
              className={`rounded-md px-2 py-1 text-xs ${index === 0 ? "bg-slate-200/10 text-slate-100" : "text-slate-400"}`}
              key={tab}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>

        <section
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} ${WORKSPACE_UI.pad14}`}
        >
          <h2
            className={`mb-2 ${WORKSPACE_UI.title13} ${WORKSPACE_UI.textPrimary}`}
          >
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

        <section
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} ${WORKSPACE_UI.pad14}`}
        >
          <h2
            className={`mb-2 ${WORKSPACE_UI.title13} ${WORKSPACE_UI.textPrimary}`}
          >
            Blocked / unresolved
          </h2>
          <ul className="space-y-2">
            {[
              {
                id: "guardrail-status",
                level: run.guardrails.status === "failed" ? "error" : "warning",
                text: `Guardrails status: ${run.guardrails.status}`,
              },
              {
                id: "uncertainty-reason",
                level: "warning",
                text: run.uncertainty.reasons[0] ?? "No uncertainty reason logged.",
              },
            ].map((item) => (
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

        <section
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} ${WORKSPACE_UI.pad14}`}
        >
          <h2
            className={`mb-2 ${WORKSPACE_UI.title13} ${WORKSPACE_UI.textPrimary}`}
          >
            Tool choice (compact)
          </h2>
          <dl className="space-y-2 text-xs">
            <div>
              <dt className="text-slate-400">Picked</dt>
              <dd className="text-slate-200">{run.toolChoices.find((tool) => tool.selected)?.name ?? "N/A"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Rejected</dt>
              <dd className="text-slate-200">{run.toolChoices.find((tool) => !tool.selected)?.name ?? "N/A"}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Reason</dt>
              <dd className="text-slate-200">
                {run.toolChoices.find((tool) => tool.selected)?.reason}
              </dd>
            </div>
          </dl>
        </section>

        <section
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} ${WORKSPACE_UI.pad14}`}
        >
          <h2
            className={`mb-1 ${WORKSPACE_UI.title13} ${WORKSPACE_UI.textPrimary}`}
          >
            Evidence
          </h2>
          <p className="text-xs text-slate-300">
            {run.evidence.source} · {run.evidence.warehouse} · {run.evidence.rowsScanned} rows · {run.evidence.freshness}
          </p>
          <p className="mt-1 text-xs text-slate-400">Query hash: {run.evidence.queryHash}</p>
        </section>
      </div>
    </aside>
  );
}
