import { useState } from "react";

import type { AgentWorkspaceRun } from "../types";

const TRACE_TABS = ["Timeline", "Raw events", "Guardrails", "Retries-latency"] as const;

const BADGES = ["3 retries", "1 spike", "42 events", "budget $0.014 / $1.00"] as const;

export function TraceConsoleBar({ run }: { run: AgentWorkspaceRun }) {
  const [activeTab, setActiveTab] = useState<(typeof TRACE_TABS)[number]>("Timeline");

  // TODO: connect to real guardrail/evidence/trace API.
  // TODO: add expanded console drawer with timeline/raw JSON/waterfall views.
  return (
    <footer className="flex h-[64px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#1e293b] bg-[#070d14] px-4 py-2 lg:px-6">
      <div className="flex min-w-0 items-center">
        <nav aria-label="Trace tabs" className="flex flex-wrap gap-1" role="tablist">
          {TRACE_TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                aria-selected={isActive}
                className={`rounded px-2 py-1 text-[11px] leading-none transition-colors ${
                  isActive ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:text-slate-200"
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
        {BADGES.map((badge) => (
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <span className="sr-only">{run.trace.eventsLabel}</span>
    </footer>
  );
}
