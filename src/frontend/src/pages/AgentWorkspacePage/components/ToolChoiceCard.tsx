import type { AgentWorkspaceRun } from "../types";
import { WORKSPACE_UI } from "../ui";

export function ToolChoiceCard({ run }: { run: AgentWorkspaceRun }) {
  // TODO: connect to real tool choice/router decision data.
  // TODO: add tool choice metrics with win-rate and fallback usage.
  return (
    <section
      className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} ${WORKSPACE_UI.panelCardBg} ${WORKSPACE_UI.pad14}`}
    >
      <h2
        className={`mb-2 ${WORKSPACE_UI.title13} ${WORKSPACE_UI.textPrimary}`}
      >
        Tool choice — why Snowflake SQL
      </h2>
      <div className="space-y-2">
        {run.toolChoices.map((tool, index) => (
          <button
            className={`w-full rounded-[12px] border p-2 text-left transition-colors ${
              index === 0
                ? "border-cyan-300/70 bg-cyan-400/12 hover:bg-cyan-400/20 active:bg-cyan-400/25"
                : "border-white/10 bg-[#1a2537] hover:bg-[#213048] active:bg-[#2a3b58]"
            }`}
            key={tool.id}
            type="button"
          >
            <p className="text-xs font-medium text-slate-100">{tool.name}</p>
            <p className="text-[11px] text-slate-400">{tool.reason}</p>
            <p className="text-[11px] text-emerald-300">score {tool.score}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
