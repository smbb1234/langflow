import { fireEvent, render, screen, within } from "@testing-library/react";
import { RunSidebar } from "../components/RunSidebar";
import { MOCK_AGENT_WORKSPACE_RUN, MOCK_RUN_GROUPS } from "../constants";
import { workspaceLightTheme } from "../theme";

jest.mock("@/components/jai/JaiLogo", () => ({
  JaiLogo: ({ className = "" }: { className?: string }) => (
    <div className={className}>JAI Logo</div>
  ),
}));

describe("RunSidebar", () => {
  it("renders logo area and + New run while omitting Agentic Workspace", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    expect(screen.getByText("JAI Logo")).toBeInTheDocument();
    expect(screen.getByText("+ New run")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create new run" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Agentic Workspace")).not.toBeInTheDocument();

    const filters = screen.getByTestId("run-sidebar-filters");
    const filterButtons = within(filters).getAllByRole("tab");
    expect(filterButtons).toHaveLength(4);
  });

  it("search input and filter behavior remain functional", () => {
    render(
      <RunSidebar
        run={MOCK_AGENT_WORKSPACE_RUN}
        theme={workspaceLightTheme}
        runGroups={MOCK_RUN_GROUPS}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Failed" }));
    expect(screen.getByText("Customer escalation #4821")).toBeInTheDocument();
    expect(screen.queryByText("Q3 revenue analysis")).not.toBeInTheDocument();

    const input = screen.getByRole("textbox", { name: "Search runs, agents" });
    fireEvent.change(input, { target: { value: "invoice" } });
    expect(screen.queryByText("Customer escalation #4821")).not.toBeInTheDocument();
  });
});
