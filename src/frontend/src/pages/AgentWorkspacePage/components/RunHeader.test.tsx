import { render, screen } from "@testing-library/react";

import { workspaceLightTheme } from "../theme";
import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { RunHeader } from "./RunHeader";

describe("RunHeader", () => {
  it("renders new title/chips/path and branch/export/menu actions", () => {
    render(<RunHeader run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />);

    expect(screen.getByRole("heading", { name: "Q3 revenue analysis" })).toBeInTheDocument();
    expect(screen.getByText("run · _8f2c14a")).toBeInTheDocument();
    expect(screen.getByText("finance_sql_agent → chart_agent")).toBeInTheDocument();

    const branchButton = screen.getByRole("button", { name: "Branch" });
    const exportButton = screen.getByRole("button", { name: "Export" });
    expect(branchButton).toBeInTheDocument();
    expect(exportButton).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open run menu" })).toBeInTheDocument();

    expect(branchButton.querySelector("svg.lucide-git-branch")).toBeInTheDocument();
    expect(exportButton.querySelector("svg.lucide-download")).toBeInTheDocument();

    ["Agentic Workspace", "Create run", "Toggle layout", "Plan", "Respond"].forEach((legacyText) => {
      expect(screen.queryByText(legacyText)).not.toBeInTheDocument();
    });
  });
});
