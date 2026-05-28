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
    const topbarLockIcons = within(front).getAllByTestId("icon-lock");
    expect(topbarLockIcons.length).toBeGreaterThanOrEqual(1);
    const topbarLockIcon = topbarLockIcons[0];
    expect(topbarLockIcon.tagName.toLowerCase()).toBe("svg");
    expect(topbarLockIcon).toHaveAttribute("viewBox", "0 0 24 24");
    expect(topbarLockIcon).toHaveAttribute("aria-hidden", "true");
    expect(topbarLockIcon.querySelector(`path[d="M8 11V7a4 4 0 1 1 8 0v4"]`)).toBeInTheDocument();
    expect(topbarLockIcon.querySelector(`rect[x="5"][y="11"][width="14"][height="9"][rx="2"]`)).toBeInTheDocument();
    expect(within(front).getAllByTestId("topbar-divider")).toHaveLength(2);

    const actions = screen.getByRole("button", { name: "Pause run" }).parentElement as HTMLElement;
    const buttons = within(actions).getAllByRole("button");
    expect(buttons[0]).toHaveAccessibleName("Pause run");
    expect(buttons[1]).toHaveAccessibleName("Refresh run");
    expect(buttons[2]).toHaveAccessibleName("Toggle scope lock");
    const actionLockIcon = within(buttons[2]).getByTestId("icon-lock");
    expect(actionLockIcon.tagName.toLowerCase()).toBe("svg");

    const financeLabel = within(front).getByText("finance_ro");
    expect(financeLabel.previousElementSibling).toHaveAttribute("data-testid", "icon-lock");
    expect(buttons[3]).toHaveAccessibleName("Stop run");
    expect(within(buttons[3]).getByTestId("icon-stop-outline")).toBeInTheDocument();
  });
});
