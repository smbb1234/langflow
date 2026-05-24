import { MOCK_AGENT_WORKSPACE_COPY } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";
import { WORKSPACE_UI } from "../ui";
import { AgentPlanCard } from "./AgentPlanCard";
import { ConversationPanel } from "./ConversationPanel";
import { ToolChoiceCard } from "./ToolChoiceCard";
import { TraceConsoleBar } from "./TraceConsoleBar";
import { WorkspacePromptInput } from "./WorkspacePromptInput";

export function RunMainPanel({
  run,
  theme,
}: {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
}) {
  // TODO: connect to real agent runtime API.
  const handleNoopAction = () => {};
  const handlePromptSubmit = (_prompt: string) => {};
  return (
    <main
      className="flex min-h-0 w-full max-w-[795px] flex-1 flex-col"
      style={{ backgroundColor: "#0b1320" }}
    >
      <header
        className="h-[60px] border-b px-4 py-3 lg:px-6"
        style={{ borderColor: theme.borderSoft }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className={`${WORKSPACE_UI.title20} text-white`}>
              Finance anomaly triage · Run A-2026-0523
            </h1>
            <p className="text-xs text-slate-400">{run.id}</p>
            <p className="text-xs text-slate-300">{run.agentName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              onClick={handleNoopAction}
              type="button"
            >
              Branch
            </button>
            <button
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              onClick={handleNoopAction}
              type="button"
            >
              Export
            </button>
            <button
              aria-label="More actions"
              className="rounded-[10px] border border-white/15 bg-[#111b2b] px-3 py-1.5 text-xs text-slate-100"
              onClick={handleNoopAction}
              type="button"
            >
              ...
            </button>
          </div>
        </div>
      </header>

      <section
        className="h-[40px] border-b px-4 lg:px-6"
        style={{ borderColor: theme.borderSoft }}
      >
        <div aria-label="Run detail tabs" className="flex gap-5" role="tablist">
          {MOCK_AGENT_WORKSPACE_COPY.mainTabs.map((tab, index) => {
            const active = index === 0;
            return (
              <button
                aria-selected={active}
                className={`relative py-2 text-sm ${active ? "text-cyan-300" : "text-slate-400"}`}
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

      <section className="h-[440px] min-h-0 overflow-y-auto px-4 py-4 lg:px-6">
        <div className="space-y-3">
          <article
            className={`${WORKSPACE_UI.radius12} ${WORKSPACE_UI.panelCardBorder} bg-[#121d2e] p-[14px]`}
          >
            <p
              className={`mb-2 ${WORKSPACE_UI.text12} ${WORKSPACE_UI.textMuted}`}
            >
              V2 summary
            </p>
            <p className="text-sm text-slate-100">
              assistant: Drafting board-ready narrative with validated Q3 deltas.
            </p>
          </article>

          <ConversationPanel run={run} />
          <AgentPlanCard run={run} />
          <ToolChoiceCard run={run} />
        </div>
      </section>
      <div className="h-[100px]">
        <WorkspacePromptInput onSubmitPrompt={handlePromptSubmit} />
      </div>
      <div className="h-[162px]">
        <TraceConsoleBar run={run} theme={theme} />
      </div>
    </main>
  );
}
