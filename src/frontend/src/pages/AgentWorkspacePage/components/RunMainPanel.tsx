import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun, WorkspaceTab } from "../types";
import { ConversationThread } from "./ConversationThread";
import { RunHeader } from "./RunHeader";
import { TraceConsoleBar } from "./TraceConsoleBar";
import { WorkspacePromptInput } from "./WorkspacePromptInput";
import { WorkspaceTabs } from "./WorkspaceTabs";

type RunMainPanelProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
  onBranchRun?: () => void;
  onExportRun?: () => void;
  onOpenRunMenu?: () => void;
};

export function RunMainPanel({
  run,
  theme,
  activeTab = "overview",
  onTabChange,
  onBranchRun,
  onExportRun,
  onOpenRunMenu,
}: RunMainPanelProps) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col" style={{ backgroundColor: theme.pageBg }}>
      <RunHeader
        run={run}
        theme={theme}
        onBranchRun={onBranchRun}
        onExportRun={onExportRun}
        onOpenRunMenu={onOpenRunMenu}
      />
      <WorkspaceTabs theme={theme} activeTab={activeTab} onTabChange={onTabChange} />
      {/* TODO: render non-overview panels once each tab gets dedicated content. */}
      <ConversationThread run={run} theme={theme} />
      <div className="h-[100px]">
        <WorkspacePromptInput run={run} theme={theme} />
      </div>
      <div className="h-[162px]">
        <TraceConsoleBar run={run} theme={theme} />
      </div>
    </main>
  );
}
