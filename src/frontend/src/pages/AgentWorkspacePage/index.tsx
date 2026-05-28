import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
import { ResizeHandle } from "./components/ResizeHandle";
import { RunInspectorPanel } from "./components/RunInspectorPanel";
import { RunMainPanel } from "./components/RunMainPanel";
import { RunSidebar } from "./components/RunSidebar";
import { WorkspaceTopBar } from "./components/WorkspaceTopBar";
import {
  DEFAULT_INSPECTOR_WIDTH,
  DEFAULT_SIDEBAR_WIDTH,
  DEFAULT_TRACE_HEIGHT,
  MAX_INSPECTOR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MAX_TRACE_HEIGHT,
  MIN_INSPECTOR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  MIN_TRACE_HEIGHT,
  STORAGE_KEYS,
  MOCK_AGENT_WORKSPACE_RUN,
} from "./constants";
import {
  clampResizableValue,
  useResizablePanel,
} from "./hooks/useResizablePanel";
import { workspaceDarkTheme, workspaceLightTheme } from "./theme";
import type { WorkspaceTab } from "./types";

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
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const { value: sidebarWidth, setValue: setSidebarWidth } = useResizablePanel({
    defaultValue: DEFAULT_SIDEBAR_WIDTH,
    min: MIN_SIDEBAR_WIDTH,
    max: MAX_SIDEBAR_WIDTH,
    storageKey: STORAGE_KEYS.sidebarWidth,
  });
  const { value: inspectorWidth, setValue: setInspectorWidth } =
    useResizablePanel({
      defaultValue: DEFAULT_INSPECTOR_WIDTH,
      min: MIN_INSPECTOR_WIDTH,
      max: MAX_INSPECTOR_WIDTH,
      storageKey: STORAGE_KEYS.inspectorWidth,
    });
  const { value: traceHeight, setValue: setTraceHeight } = useResizablePanel({
    defaultValue: DEFAULT_TRACE_HEIGHT,
    min: MIN_TRACE_HEIGHT,
    max: MAX_TRACE_HEIGHT,
    storageKey: STORAGE_KEYS.traceHeight,
  });
  const dragCleanupRef = useRef<(() => void) | null>(null);
  // TODO: derive workspaceRun from flow execution/session data.
  // TODO: wire to backend run stream.
  const requestRef = useRef(0);

  useEffect(
    () => () => {
      dragCleanupRef.current?.();
    },
    [],
  );

  const startSidebarResize = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      dragCleanupRef.current?.();
      event.preventDefault();

      const startX = event.clientX;
      const startWidth = sidebarWidth;
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const handlePointerMove = (moveEvent: PointerEvent) => {
        setSidebarWidth(
          clampResizableValue(
            startWidth + moveEvent.clientX - startX,
            MIN_SIDEBAR_WIDTH,
            MAX_SIDEBAR_WIDTH,
          ),
        );
      };

      const stopResize = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", stopResize);
        document.removeEventListener("pointercancel", stopResize);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
        dragCleanupRef.current = null;
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", stopResize);
      document.addEventListener("pointercancel", stopResize);
      dragCleanupRef.current = stopResize;
    },
    [setSidebarWidth, sidebarWidth],
  );

  const startInspectorResize = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      dragCleanupRef.current?.();
      event.preventDefault();

      const startX = event.clientX;
      const startWidth = inspectorWidth;
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const handlePointerMove = (moveEvent: PointerEvent) => {
        setInspectorWidth(
          clampResizableValue(
            startWidth - (moveEvent.clientX - startX),
            MIN_INSPECTOR_WIDTH,
            MAX_INSPECTOR_WIDTH,
          ),
        );
      };

      const stopResize = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", stopResize);
        document.removeEventListener("pointercancel", stopResize);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
        dragCleanupRef.current = null;
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", stopResize);
      document.addEventListener("pointercancel", stopResize);
      dragCleanupRef.current = stopResize;
    },
    [inspectorWidth, setInspectorWidth],
  );

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
        if (
          flow.access_type !== "PUBLIC" ||
          (inputs.length === 0 && outputs.length === 0)
        )
          return navigate("/");
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
      const cookieOptions: CookieOptions = {
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      };
      setCookie("client_id", newClientId, cookieOptions);
      setClientId(newClientId);
    } else setClientId(clientId);
  }, [setClientId]);

  if (isLoading) {
    return (
      <div
        className="flex h-screen w-screen items-center justify-center"
        style={{ backgroundColor: theme.pageBg, color: theme.textMuted }}
      >
        Loading workspace...
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{ backgroundColor: theme.pageBg, color: theme.textPrimary }}
    >
      <div
        className="flex h-full w-full"
        data-testid="agent-workspace-layout-row"
      >
        <RunSidebar run={workspaceRun} theme={theme} width={sidebarWidth} />
        <ResizeHandle
          ariaLabel="Resize left sidebar"
          className="hidden md:block"
          onResizeStart={startSidebarResize}
          orientation="vertical"
          theme={theme}
        />
        <div
          className="flex min-w-0 flex-1 flex-col"
          data-testid="agent-workspace-right-column"
        >
          <WorkspaceTopBar run={workspaceRun} theme={theme} />
          <div
            className="flex min-h-0 flex-1"
            data-testid="agent-workspace-content-row"
          >
            <RunMainPanel
              run={workspaceRun}
              theme={theme}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              traceHeight={traceHeight}
              onTraceHeightChange={setTraceHeight}
            />
            <ResizeHandle
              ariaLabel="Resize inspector panel"
              onResizeStart={startInspectorResize}
              orientation="vertical"
              theme={theme}
            />
            <RunInspectorPanel
              run={workspaceRun}
              theme={theme}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              width={inspectorWidth}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 z-[999]">
        <AlertDisplayArea />
      </div>
    </div>
  );
}
