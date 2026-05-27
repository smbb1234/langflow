import { render, screen, waitFor } from "@testing-library/react";
import AgentWorkspacePage from "../index";

const mockNavigate = jest.fn();
const mockSetCurrentFlow = jest.fn();
const mockSetClientId = jest.fn();
const mockGetFlow = jest.fn();
const mockGetCookie = jest.fn();
const mockSetCookie = jest.fn();

const mockGetInputsAndOutputs = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "flow-1" }),
}));

jest.mock("uuid", () => ({
  v4: () => "generated-client-id",
}));

jest.mock("@/alerts/displayArea", () => () => <div>Alerts</div>);

jest.mock("@/controllers/API/queries/config/use-get-config", () => ({
  useGetConfig: () => ({}),
}));

jest.mock("@/controllers/API/queries/flows/use-get-flow", () => ({
  useGetFlow: () => ({ mutateAsync: mockGetFlow }),
}));

jest.mock("@/customization/hooks/use-custom-navigate", () => ({
  useCustomNavigate: () => mockNavigate,
}));

jest.mock("@/stores/flowsManagerStore", () => ({
  __esModule: true,
  default: (selector: (state: { setCurrentFlow: typeof mockSetCurrentFlow }) => unknown) =>
    selector({
      setCurrentFlow: mockSetCurrentFlow,
    }),
}));

jest.mock("@/stores/utilityStore", () => ({
  useUtilityStore: (selector: (state: { setClientId: typeof mockSetClientId }) => unknown) =>
    selector({
      setClientId: mockSetClientId,
    }),
}));

jest.mock("@/utils/storeUtils", () => ({
  getInputsAndOutputs: (...args: unknown[]) => mockGetInputsAndOutputs(...args),
}));

jest.mock("@/utils/utils", () => ({
  getCookie: (...args: unknown[]) => mockGetCookie(...args),
  setCookie: (...args: unknown[]) => mockSetCookie(...args),
}));

const publicFlow = {
  id: "flow-1",
  name: "Public Flow",
  access_type: "PUBLIC",
  data: {
    nodes: [
      {
        id: "in-1",
        data: { type: "ChatInput", node: { template: {} } },
      },
      {
        id: "out-1",
        data: { type: "ChatOutput", node: { template: {} } },
      },
    ],
  },
};

describe("AgentWorkspacePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCookie.mockReturnValue("existing-client-id");
    mockGetFlow.mockResolvedValue(publicFlow);
    mockGetInputsAndOutputs.mockReturnValue({ inputs: [{ id: "in-1" }], outputs: [{ id: "out-1" }] });
  });

  it("follows loading then renders workspace for public flow with IO", async () => {
    render(<AgentWorkspacePage />);

    expect(screen.getByText("Loading workspace...")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetCurrentFlow).toHaveBeenCalledWith(publicFlow);
    });

    expect(mockNavigate).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText("Loading workspace...")).not.toBeInTheDocument();
    });

    expect(await screen.findByText("Alerts")).toBeInTheDocument();
    expect(document.title).toBe("Public Flow · Agent Workspace");

    const layoutRow = screen.getByTestId("agent-workspace-layout-row");
    const sidebar = layoutRow.querySelector("aside");
    const rightColumn = screen.getByTestId("agent-workspace-right-column");
    const topBar = rightColumn.querySelector("header");

    expect(sidebar).toBeInTheDocument();
    expect(rightColumn.parentElement).toBe(layoutRow);
    expect(sidebar?.parentElement).toBe(layoutRow);
    expect(topBar).toBeInTheDocument();
    expect(topBar?.parentElement).toBe(rightColumn);
    expect(layoutRow.firstElementChild).toBe(sidebar);
  });

  it("redirects to home when flow is private", async () => {
    mockGetFlow.mockResolvedValue({ ...publicFlow, access_type: "PRIVATE" });

    render(<AgentWorkspacePage />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects to home when flow has no inputs and outputs", async () => {
    mockGetFlow.mockResolvedValue({ ...publicFlow, data: { nodes: [] } });
    mockGetInputsAndOutputs.mockReturnValue({ inputs: [], outputs: [] });

    render(<AgentWorkspacePage />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("creates client_id cookie when missing", async () => {
    mockGetCookie.mockReturnValue(undefined);

    render(<AgentWorkspacePage />);

    await waitFor(() => {
      expect(mockSetCookie).toHaveBeenCalledWith(
        "client_id",
        "generated-client-id",
        expect.objectContaining({ sameSite: "Strict" }),
      );
      expect(mockSetClientId).toHaveBeenCalledWith("generated-client-id");
    });
  });
});
