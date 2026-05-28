import { render, screen } from "@testing-library/react";

import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceLightTheme } from "../theme";
import { WorkspaceTopBar } from "./WorkspaceTopBar";

describe("WorkspaceTopBar", () => {
  it("renders full run progress stages with Tool as active and accessible status labels", () => {
    render(<WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />);

    expect(screen.getByText("Q3 revenue analysis")).toBeInTheDocument();

    const progressGroup = screen.getByLabelText("Run progress stages");
    expect(progressGroup).toBeInTheDocument();

    ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Respond"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    [
      "Plan stage, done",
      "Retrieve stage, done",
      "Reason stage, done",
      "Tool stage, active",
      "Validate stage, pending",
      "Respond stage, pending",
    ].forEach((ariaLabel) => {
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    const activeStage = screen.getByLabelText("Tool stage, active");
    expect(activeStage).toHaveAttribute("aria-current", "step");

    ["Plan stage, done", "Retrieve stage, done", "Reason stage, done"].forEach((ariaLabel) => {
      expect(screen.getByLabelText(ariaLabel)).not.toHaveAttribute("aria-current", "step");
    });

    expect(screen.queryByLabelText("Agent progress")).not.toBeInTheDocument();

    ["Create run", "Toggle layout"].forEach((legacyLabel) => {
      expect(screen.queryByText(legacyLabel)).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: legacyLabel })).not.toBeInTheDocument();
    });
  });
});
