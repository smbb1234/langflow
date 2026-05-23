import type { AgentWorkspaceRun } from "../types";
import { ConversationPanel } from "./ConversationPanel";
import { RunStageProgress } from "./RunStageProgress";
import { WorkspacePromptInput } from "./WorkspacePromptInput";

export function RunMainPanel({ run }: { run: AgentWorkspaceRun }) {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#0b1320]">
      <RunStageProgress run={run} />
      <ConversationPanel run={run} />
      <WorkspacePromptInput />
    </main>
  );
}
