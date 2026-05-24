import { useState } from "react";

import { MOCK_AGENT_WORKSPACE_COPY } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function TraceConsoleBar({
  run,
  theme,
}: {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
}) {
  const mappedTabs = run.trace.tabs.map(
    (tab) => MOCK_AGENT_WORKSPACE_COPY.traceTabs[tab],
  );
  const [activeTab, setActiveTab] = useState<string>(mappedTabs[0]);
  const badges = ["elapsed 00:42", "events 42", "errors 0", "cost $0.014"];

  // TODO: connect to real guardrail/evidence/trace API.
  // TODO: add expanded console drawer with timeline/raw JSON/waterfall views.
  return (
    <footer
      className="flex h-full flex-col gap-3 border-t px-4 py-3 lg:px-6"
      style={{
        borderColor: theme.borderPrimary,
        backgroundColor: theme.panelBackground,
      }}
    >
      <div className="flex min-w-0 items-center justify-between">
        <nav
          aria-label="Trace tabs"
          className="flex flex-wrap gap-1"
          role="tablist"
        >
          {mappedTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                aria-selected={isActive}
                className={`rounded px-2 py-1 text-[11px] leading-none transition-colors ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                type="button"
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-200">
        {badges.map((badge) => (
          <span
            className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5"
            key={badge}
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 text-[11px] text-slate-200">
        {[
          "finance_sql_agent",
          "chart_agent",
          "tool · run_sql",
          "tool · render",
          "guardrails",
        ].map((item) => (
          <div className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-2" key={item}>
            {item}
          </div>
        ))}
      </div>
      <span className="sr-only">{run.trace.eventsLabel}</span>
    </footer>
  );
}
