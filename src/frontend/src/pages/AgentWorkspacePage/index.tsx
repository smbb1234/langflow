import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AlertDisplayArea from "@/alerts/displayArea";
import { useGetConfig } from "@/controllers/API/queries/config/use-get-config";
import { useGetFlow } from "@/controllers/API/queries/flows/use-get-flow";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { type CookieOptions, getCookie, setCookie } from "@/utils/utils";
import { getInputsAndOutputs } from "@/utils/storeUtils";
import { MOCK_AGENT_WORKSPACE_RUN } from "./constants";
import { RunInspectorPanel } from "./components/RunInspectorPanel";
import { RunMainPanel } from "./components/RunMainPanel";
import { RunSidebar } from "./components/RunSidebar";
import { TraceConsoleBar } from "./components/TraceConsoleBar";
import { WorkspaceTopBar } from "./components/WorkspaceTopBar";

export default function AgentWorkspacePage() {
  useGetConfig({});
  const { id } = useParams();
  const navigate = useCustomNavigate();
  const { mutateAsync: getFlow } = useGetFlow();
  const setCurrentFlow = useFlowsManagerStore((state) => state.setCurrentFlow);
  const setClientId = useUtilityStore((state) => state.setClientId);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    const initializeWorkspace = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          navigate("/");
          return;
        }

        const flow = await getFlow({ id, public: true });

        if (!flow) {
          navigate("/");
          return;
        }

        const { inputs, outputs } = getInputsAndOutputs(flow.data?.nodes || []);
        if (
          flow.access_type !== "PUBLIC" ||
          (inputs.length === 0 && outputs.length === 0)
        ) {
          navigate("/");
          return;
        }

        if (mounted && requestRef.current === requestId) {
          setCurrentFlow(flow);
          document.title = `${flow.name} · Agent Workspace`;
        }
      } catch {
        navigate("/");
      } finally {
        if (mounted && requestRef.current === requestId) {
          setIsLoading(false);
        }
      }
    };

    initializeWorkspace();

    return () => {
      mounted = false;
    };
    // We intentionally key initialization by URL id to avoid unstable hook callbacks
    // from retriggering endless loading requests on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const clientId = getCookie("client_id");
    if (!clientId) {
      const newClientId = uuid();
      const cookieOptions: CookieOptions = {
        secure: window.location.protocol === "https:",
        sameSite: "Strict",
      };
      setCookie("client_id", newClientId, cookieOptions);
      setClientId(newClientId);
    } else {
      setClientId(clientId);
    }
  }, [setClientId]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a1018] text-[#94a3b8]">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0a1018] text-[#f1f5f9]">
      {/* TODO: connect to real agent runtime API. */}
      <WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} />
        <RunMainPanel run={MOCK_AGENT_WORKSPACE_RUN} />
        <RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} />
      </div>
      <TraceConsoleBar run={MOCK_AGENT_WORKSPACE_RUN} />
      <div className="fixed bottom-4 left-4 z-[999]">
        <AlertDisplayArea />
      </div>
    </div>
  );
}
