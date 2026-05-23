import type { AgentWorkspaceRun } from "../types";
import { AgentPlanCard } from "./AgentPlanCard";
import { ToolChoiceCard } from "./ToolChoiceCard";

export function RunSidebar({ run }: { run: AgentWorkspaceRun }) {
  // TODO: add collapsible history list and pinned runs in sidebar.
  return (
    <aside className="hidden h-full overflow-y-auto border-r border-white/10 bg-[#0d1522] p-3 lg:block lg:w-[300px]">
      <nav
        aria-label="Sidebar tabs"
        className="mb-3 flex gap-3 text-xs"
        role="tablist"
      >
        <button
          aria-selected={true}
          className="text-slate-100"
          role="tab"
          type="button"
        >
          Plan
        </button>
        <button
          aria-selected={false}
          className="text-slate-400"
          role="tab"
          type="button"
        >
          Tools
        </button>
      </nav>
      <div className="space-y-3">
        <AgentPlanCard run={run} />
        <ToolChoiceCard run={run} />
      </div>
    </aside>
  );
}
