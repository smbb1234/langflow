import { fireEvent, render, screen, within } from "@testing-library/react";
import { RunSidebar } from "../components/RunSidebar";
import { MOCK_AGENT_WORKSPACE_RUN, MOCK_RUN_GROUPS } from "../constants";
import { workspaceLightTheme } from "../theme";

jest.mock("@/components/jai/JaiLogo", () => ({ JaiLogo: ({ className = "" }: { className?: string }) => <div data-testid="sidebar-logo" className={className}>JAI Logo</div> }));

describe("RunSidebar", () => {
  it("renders full-row logo size and full-width new run button", () => {
    render(<RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />);
    expect(screen.getByTestId("sidebar-logo")).toHaveClass("h-11", "w-full");
    expect(screen.getByRole("button", { name: "Create new run" })).toHaveClass("w-full");
    const filters = screen.getByTestId("run-sidebar-filters");
    expect(within(filters).getAllByRole("tab")).toHaveLength(4);
  });

  it("search input and filter behavior remain functional", () => {
    render(<RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} runGroups={MOCK_RUN_GROUPS} />);
    fireEvent.click(screen.getByRole("tab", { name: "Failed" }));
    expect(screen.getByText("Customer escalation #4821")).toBeInTheDocument();
    const input = screen.getByRole("textbox", { name: "Search runs, agents" });
    fireEvent.change(input, { target: { value: "invoice" } });
    expect(screen.queryByText("Customer escalation #4821")).not.toBeInTheDocument();
  });
});
