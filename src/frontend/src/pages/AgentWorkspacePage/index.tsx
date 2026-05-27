import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AlertDisplayArea from "@/alerts/displayArea";
import { useGetConfig } from "@/controllers/API/queries/config/use-get-config";
import { useGetFlow } from "@/controllers/API/queries/flows/use-get-flow";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { useDarkStore } from "@/stores/darkStore";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { getInputsAndOutputs } from "@/utils/storeUtils";
import { type CookieOptions, getCookie, setCookie } from "@/utils/utils";
import { RunInspectorPanel } from "./components/RunInspectorPanel";
import { RunMainPanel } from "./components/RunMainPanel";
import { RunSidebar } from "./components/RunSidebar";
import { WorkspaceTopBar } from "./components/WorkspaceTopBar";
import { MOCK_AGENT_WORKSPACE_RUN } from "./constants";
import { workspaceDarkTheme, workspaceLightTheme } from "./theme";

export default function AgentWorkspacePage() {
  useGetConfig({});
  const { id } = useParams();
  const navigate = useCustomNavigate();
  const { mutateAsync: getFlow } = useGetFlow();
  const setCurrentFlow = useFlowsManagerStore((state) => state.setCurrentFlow);
  const setClientId = useUtilityStore((state) => state.setClientId);
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useDarkStore((state) => state.dark);
  const theme = isDark ? workspaceDarkTheme : workspaceLightTheme;
  const workspaceRun = MOCK_AGENT_WORKSPACE_RUN;
  // TODO: derive workspaceRun from flow execution/session data.
  // TODO: wire to backend run stream.
  const requestRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    const initializeWorkspace = async () => {
      setIsLoading(true);
      try {
        if (!id) return navigate("/");
        const flow = await getFlow({ id, public: true });
        if (!flow) return navigate("/");
        const { inputs, outputs } = getInputsAndOutputs(flow.data?.nodes || []);
        if (flow.access_type !== "PUBLIC" || (inputs.length === 0 && outputs.length === 0)) return navigate("/");
        if (mounted && requestRef.current === requestId) {
          setCurrentFlow(flow);
          document.title = `${flow.name} · Agent Workspace`;
        }
      } catch {
        navigate("/");
      } finally {
        if (mounted && requestRef.current === requestId) setIsLoading(false);
      }
    };
    initializeWorkspace();
    return () => {
      mounted = false;
    };
  // We intentionally key initialization by URL id...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const clientId = getCookie("client_id");
    if (!clientId) {
      const newClientId = uuid();
      const cookieOptions: CookieOptions = { secure: window.location.protocol === "https:", sameSite: "Strict" };
      setCookie("client_id", newClientId, cookieOptions);
      setClientId(newClientId);
    } else setClientId(clientId);
  }, [setClientId]);

  if (isLoading) {
    return <div className="flex h-screen w-screen items-center justify-center" style={{ backgroundColor: theme.pageBg, color: theme.textMuted }}>Loading workspace...</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ backgroundColor: theme.pageBg, color: theme.textPrimary }}>
      <div className="flex h-full w-full" data-testid="agent-workspace-layout-row">
        <RunSidebar run={workspaceRun} theme={theme} />
        <div className="flex min-w-0 flex-1 flex-col" data-testid="agent-workspace-right-column">
          <WorkspaceTopBar run={workspaceRun} theme={theme} />
          <div className="flex min-h-0 flex-1" data-testid="agent-workspace-content-row">
            <RunMainPanel run={workspaceRun} theme={theme} />
            <RunInspectorPanel run={workspaceRun} theme={theme} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 z-[999]">
        <AlertDisplayArea />
      </div>
    </div>
  );
}
