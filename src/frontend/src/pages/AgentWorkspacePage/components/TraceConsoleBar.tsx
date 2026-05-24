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
  const badges = [
    `${run.metrics.retryCount} retry`,
    `${run.metrics.eventCount} events`,
    `budget ${run.metrics.budgetUsedPct}%`,
    `$${run.metrics.costUsd.toFixed(3)}`,
  ];

  // TODO: connect to real guardrail/evidence/trace API.
  // TODO: add expanded console drawer with timeline/raw JSON/waterfall views.
  return (
    <footer
      className="flex h-[64px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2 lg:px-6"
      style={{
        borderColor: theme.borderPrimary,
        backgroundColor: theme.panelBackground,
      }}
    >
      <div className="flex min-w-0 items-center">
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
      <div className="flex flex-wrap items-center justify-end gap-1.5 text-[11px] text-slate-200">
        {badges.map((badge) => (
          <span
            className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5"
            key={badge}
          >
            {badge}
          </span>
        ))}
      </div>
      <span className="sr-only">{run.trace.eventsLabel}</span>
    </footer>
  );
}
