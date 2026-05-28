import { render, screen } from "@testing-library/react";

import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceLightTheme } from "../theme";
import { WorkspaceTopBar } from "./WorkspaceTopBar";

describe("WorkspaceTopBar", () => {
  it("renders required text and aria-label actions while removing legacy content", () => {
    render(<WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />);

    expect(screen.getByText("PROD · us-east-1")).toBeInTheDocument();
    expect(screen.getByText("finance_ro")).toBeInTheDocument();
    expect(screen.getByText("tenant: acme")).toBeInTheDocument();
    expect(screen.getByText("RUNNING")).toBeInTheDocument();
    expect(screen.getByText("Q3 revenue analysis")).toBeInTheDocument();
    expect(screen.getByText("step 4/6")).toBeInTheDocument();

    expect(screen.getByLabelText("Agent progress")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Pause run" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh run" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle scope lock" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stop run" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open approvals" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open notifications, 3 unread" })).toBeInTheDocument();

    ["Plan", "Respond", "Create run", "Toggle layout"].forEach((legacyLabel) => {
      expect(screen.queryByText(legacyLabel)).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: legacyLabel })).not.toBeInTheDocument();
    });

    ["scope: finance", "tenant: global", "latency p95", "token/s"].forEach((legacyValue) => {
      expect(screen.queryByText(legacyValue)).not.toBeInTheDocument();
    });
  });
});
