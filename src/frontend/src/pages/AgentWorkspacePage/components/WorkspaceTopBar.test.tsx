import { render, screen, within } from "@testing-library/react";

import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceLightTheme } from "../theme";
import { WorkspaceTopBar } from "./WorkspaceTopBar";

describe("WorkspaceTopBar", () => {
  it("uses one front scroll container and preserves icons/dividers", () => {
    render(<WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />);

    const front = screen.getByLabelText("Top bar run context");
    expect(front).toBeInTheDocument();
    expect(within(front).getByText("PROD · us-east-1")).toBeInTheDocument();
    expect(within(front).getByText("$ 0.014")).toBeInTheDocument();
    ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Respond"].forEach((label) => expect(within(front).getByText(label)).toBeInTheDocument());
    expect(within(front).getAllByTestId("icon-lock").length).toBeGreaterThanOrEqual(1);
    expect(within(front).getAllByTestId("topbar-divider")).toHaveLength(2);

    const actions = screen.getByRole("button", { name: "Pause run" }).parentElement as HTMLElement;
    const buttons = within(actions).getAllByRole("button");
    expect(buttons[0]).toHaveAccessibleName("Pause run");
    expect(buttons[1]).toHaveAccessibleName("Refresh run");
    expect(buttons[2]).toHaveAccessibleName("Toggle scope lock");
    expect(within(buttons[2]).getByTestId("icon-lock")).toBeInTheDocument();
    expect(buttons[3]).toHaveAccessibleName("Stop run");
    expect(within(buttons[3]).getByTestId("icon-stop-outline")).toBeInTheDocument();
    const stopButton = within(actions).getByRole("button", { name: "Stop run" });
    const approvalsButton = within(actions).getByRole("button", { name: "Open approvals" });
    const actionDividers = within(actions).getAllByTestId("topbar-divider");
    expect(actionDividers).toHaveLength(1);
    const divider = actionDividers[0];
    expect(divider).toHaveStyle({ backgroundColor: workspaceLightTheme.panelBorder });
    expect(stopButton.nextElementSibling).toBe(divider);
    expect(divider.nextElementSibling).toBe(approvalsButton);
  });
});
