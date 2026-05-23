import type { AgentWorkspaceRun } from "../types";
import { WORKSPACE_UI } from "../ui";

const TABS = ["Overview", "Guardrails", "Evidence", "Trace"] as const;

const TOOL_CANDIDATES = [
  { name: "snowflake.run_sql", score: 0.92, selected: true, progress: 78 },
  { name: "postgres.run_sql", score: 0.64, selected: false, progress: 38 },
  { name: "python.execute", score: 0.41, selected: false, progress: 22 },
];

export function RunMainPanel({ run: _run }: { run: AgentWorkspaceRun }) {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#0b1320]">
      <header className="border-b border-white/10 px-4 py-4 lg:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className={`${WORKSPACE_UI.title20} text-white`}>
              Q3 revenue analysis
            </h1>
            <p className="text-xs text-slate-400">run_xxx</p>
            <p className="text-xs text-slate-300">
              finance_sql_agent -&gt; chart_agent
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              type="button"
            >
              Branch
            </button>
            <button
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              type="button"
            >
              Export
            </button>
            <button
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              type="button"
            >
              ...
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 px-4 lg:px-6">
        <div aria-label="Run detail tabs" className="flex gap-5" role="tablist">
          {TABS.map((tab, index) => {
            const active = index === 0;
            return (
              <button
                aria-selected={active}
                className={`relative py-3 text-sm ${active ? "text-cyan-300" : "text-slate-400"}`}
                key={tab}
                role="tab"
                type="button"
              >
                {tab}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-cyan-300" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 lg:px-6">
        <article
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} bg-[#121d2e] p-[14px]`}
        >
          <p
            className={`mb-2 ${WORKSPACE_UI.text12} ${WORKSPACE_UI.textMuted}`}
          >
            User request
          </p>
          <p className="text-sm text-slate-100">
            Compare Q3 revenue by region, identify the top variance drivers, and
            output a chart-ready dataset.
          </p>
        </article>

        <article
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} bg-[#121d2e] p-[14px]`}
        >
          <p
            className={`mb-2 ${WORKSPACE_UI.text12} ${WORKSPACE_UI.textMuted}`}
          >
            AgentPlanCard
          </p>
          <p className="text-sm text-slate-100">
            Plan: fetch revenue aggregates, compute deltas, then format for
            chart rendering.
          </p>
        </article>

        <article
          className={`${WORKSPACE_UI.radius12} border border-cyan-300/70 bg-[#0f1f34] p-4 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]`}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-cyan-200">
              ToolChoiceCard
            </p>
            <p className="text-xs text-cyan-100">Selecting best tool</p>
          </div>

          <div className="space-y-2">
            {TOOL_CANDIDATES.map((tool) => (
              <div
                className={`rounded-[12px] border px-3 py-2 transition-colors ${
                  tool.selected
                    ? "border-cyan-300/80 bg-cyan-400/15"
                    : "border-white/10 bg-white/[0.03] opacity-80 hover:bg-white/[0.06]"
                }`}
                key={tool.name}
              >
                <div className="mb-1 flex items-center justify-between">
                  <p
                    className={`text-sm ${tool.selected ? "text-cyan-100" : "text-slate-300"}`}
                  >
                    {tool.name}
                  </p>
                  <p className="text-xs text-slate-300">
                    score {tool.score.toFixed(2)}
                  </p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/60">
                  <div
                    className={`h-full rounded-full ${tool.selected ? "bg-cyan-300" : "bg-slate-500"}`}
                    style={{ width: `${tool.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="border-t border-white/10 px-4 py-3 lg:px-6">
        <form
          className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} space-y-2 bg-[#111b2b] p-[14px]`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-wrap items-center gap-2 px-1 pt-1">
            <span className="text-xs text-slate-400">Attach</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
              Q3_finance.csv
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
              regional_targets.xlsx
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              aria-label="Continue run prompt"
              className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Continue describing your goal or add constraints..."
              type="text"
            />
            <button
              className="rounded-[10px] bg-sky-500 px-3 py-2 text-xs font-medium text-white"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
