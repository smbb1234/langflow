import { RunInspectorPanel } from "./components/RunInspectorPanel";
import { RunMainPanel } from "./components/RunMainPanel";
import { RunSidebar } from "./components/RunSidebar";
import { TraceConsoleBar } from "./components/TraceConsoleBar";
import { WorkspaceTopBar } from "./components/WorkspaceTopBar";
import { MOCK_AGENT_WORKSPACE_RUN } from "./constants";

export default function AgentWorkspacePage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#0a1018] text-[#f1f5f9]">
      <WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} />
      <div className="flex h-[calc(100vh-56px-64px)] min-h-0 flex-col overflow-hidden md:flex-row">
        <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} />
        <RunMainPanel run={MOCK_AGENT_WORKSPACE_RUN} />
        <RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} />
      </div>
      <TraceConsoleBar run={MOCK_AGENT_WORKSPACE_RUN} />
    </div>
  );
}
