import { render, screen } from "@testing-library/react";

import { RunHeader } from "../components/RunHeader";
import { RunInspectorPanel } from "../components/RunInspectorPanel";
import { RunMainPanel } from "../components/RunMainPanel";
import { WorkspaceTopBar } from "../components/WorkspaceTopBar";
import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceDarkTheme } from "../theme";

describe("Agent workspace header and tabs", () => {
  it("WorkspaceTopBar renders run context and stage chips without logo", () => {
    render(<WorkspaceTopBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.queryByText(/jai/i)).not.toBeInTheDocument();
    expect(screen.getByText("PROD · us-east-1")).toBeInTheDocument();
    expect(screen.getByText("finance_ro")).toBeInTheDocument();
    expect(screen.getByText("tenant: acme")).toBeInTheDocument();
  });

  it("RunHeader is compact and keeps key controls", () => {
    render(<RunHeader run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.getByRole("heading", { name: MOCK_AGENT_WORKSPACE_RUN.title })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Branch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
  });

  it("RunMainPanel no longer renders the center workspace tab row", () => {
    render(<RunMainPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.queryByRole("tab", { name: "Overview" })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: "Guardrails" })).not.toBeInTheDocument();
  });

  it("Inspector panel tabs remain unchanged", () => {
    render(<RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Guardrails" })).toBeInTheDocument();
  });
});
