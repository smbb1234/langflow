import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RunHeader } from "../components/RunHeader";
import { RunInspectorPanel } from "../components/RunInspectorPanel";
import { RunMainPanel } from "../components/RunMainPanel";
import { WorkspaceTopBar } from "../components/WorkspaceTopBar";
import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceDarkTheme } from "../theme";
import type { WorkspaceTab } from "../types";

function SynchronizedPanels() {
  const [activeTab, setActiveTab] = React.useState<WorkspaceTab>("overview");

  return (
    <div>
      <RunMainPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} activeTab={activeTab} onTabChange={setActiveTab} />
      <RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

describe("Agent workspace header and tabs", () => {
  it("WorkspaceTopBar renders run context and stage chips without logo", () => {
    render(<WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);

    expect(screen.queryByText(/jai/i)).not.toBeInTheDocument();
    expect(screen.getByText(MOCK_AGENT_WORKSPACE_RUN.environment)).toBeInTheDocument();
    expect(screen.getByText(MOCK_AGENT_WORKSPACE_RUN.scope)).toBeInTheDocument();
    expect(screen.getByText(`tenant: ${MOCK_AGENT_WORKSPACE_RUN.tenant}`)).toBeInTheDocument();
    expect(screen.getByText(MOCK_AGENT_WORKSPACE_RUN.status)).toBeInTheDocument();

    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Retrieve")).toBeInTheDocument();
    expect(screen.getByText("Reason")).toBeInTheDocument();
    expect(screen.getByText("Tool")).toBeInTheDocument();
    expect(screen.getByText("Validate")).toBeInTheDocument();
    expect(screen.getByText("Respond")).toBeInTheDocument();

    expect(screen.getByText(/approval pending/i)).toBeInTheDocument();
    expect(screen.getByText(String(MOCK_AGENT_WORKSPACE_RUN.metrics.retryCount))).toBeInTheDocument();
  });

  it("RunHeader is compact and keeps key controls", () => {
    render(<RunHeader run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);

    expect(screen.getByRole("heading", { name: MOCK_AGENT_WORKSPACE_RUN.title })).toBeInTheDocument();
    expect(screen.getByText(`run · ${MOCK_AGENT_WORKSPACE_RUN.runDisplayId}`)).toBeInTheDocument();
    expect(screen.getByText(MOCK_AGENT_WORKSPACE_RUN.agentPath)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Branch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open run menu" })).toBeInTheDocument();
    expect(document.querySelectorAll("header")).toHaveLength(1);
  });

  it("synchronizes workspace tabs and inspector tabs through one activeTab state", async () => {
    const user = userEvent.setup();
    render(<SynchronizedPanels />);

    await user.click(screen.getAllByRole("button", { name: "Guardrails" })[0]);
    expect(screen.getByText("Prompt Security Center")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Evidence" })[1]);
    expect(screen.getByText("Provenance summary")).toBeInTheDocument();
  });
});
