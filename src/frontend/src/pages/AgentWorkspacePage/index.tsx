import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AlertDisplayArea from "@/alerts/displayArea";
import { useGetConfig } from "@/controllers/API/queries/config/use-get-config";
import { useGetFlow } from "@/controllers/API/queries/flows/use-get-flow";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { getInputsAndOutputs } from "@/utils/storeUtils";
import { type CookieOptions, getCookie, setCookie } from "@/utils/utils";

export default function AgentWorkspacePage() {
  useGetConfig({});
  const { id } = useParams();
  const { mutateAsync: getFlow } = useGetFlow();
  const navigate = useCustomNavigate();

  const setCurrentFlow = useFlowsManagerStore((state) => state.setCurrentFlow);
  const setIsLoading = useFlowsManagerStore((state) => state.setIsLoading);
  const setClientId = useUtilityStore((state) => state.setClientId);

  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeWorkspace = async () => {
      setIsLoading(true);
      try {
        const flow = await getFlow({ id: id!, public: true });
        if (!flow) {
          navigate("/");
          return;
        }

        if (flow.access_type !== "PUBLIC") {
          navigate("/");
          return;
        }

        const { inputs, outputs } = getInputsAndOutputs(flow.data.nodes || []);
        if (inputs.length === 0 && outputs.length === 0) {
          navigate("/");
          return;
        }

        setCurrentFlow(flow);
        document.title = `${flow.name} · Agent Workspace`;
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsLoadingWorkspace(false);
        }
      }
    };

    initializeWorkspace();

    return () => {
      mounted = false;
    };
  }, [getFlow, id, navigate, setCurrentFlow, setIsLoading]);

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

  // TODO: connect to real agent runtime API.

  if (isLoadingWorkspace) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0a1018] text-[#94a3b8]">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center align-middle">
      <div className="fixed bottom-4 left-4 z-[999]">
        <AlertDisplayArea />
      </div>
    </div>
  );
}
