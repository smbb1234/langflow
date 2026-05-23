import type { AgentWorkspaceRun } from "../types";
import { AgentPlanCard } from "./AgentPlanCard";
import { ToolChoiceCard } from "./ToolChoiceCard";

export function RunSidebar({ run }: { run: AgentWorkspaceRun }) {
  return (
    <aside className="hidden h-full overflow-y-auto border-r border-white/10 bg-[#0d1522] p-3 lg:block lg:w-[300px]">
      <div className="space-y-3">
        <AgentPlanCard run={run} />
        <ToolChoiceCard run={run} />
      </div>
    </aside>
  );
}
