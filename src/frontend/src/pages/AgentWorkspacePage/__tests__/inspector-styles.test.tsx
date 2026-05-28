import { render, screen } from "@testing-library/react";
import { RunInspectorPanel } from "../components/RunInspectorPanel";
import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceLightTheme } from "../theme";

describe("Inspector card elevation", () => {
  it("applies shadowSoft to overview cards", () => {
    render(<RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} activeTab="overview" />);
    expect(screen.getByText("Current run").closest("section")).toHaveStyle({ boxShadow: workspaceLightTheme.shadowSoft });
    expect(screen.getByText("Blocked / unresolved").closest("section")).toHaveStyle({ boxShadow: workspaceLightTheme.shadowSoft });
    expect(screen.getByText("Uncertainty").closest("section")).toHaveStyle({ boxShadow: workspaceLightTheme.shadowSoft });
    expect(screen.getByText("Tool choice — why Snowflake SQL").closest("section")).toHaveStyle({ boxShadow: workspaceLightTheme.shadowSoft });
  });
});
