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
  it("renders logo, new run button, search input, and exactly four filter buttons", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    expect(screen.getByText("JAI Logo")).toBeInTheDocument();
    expect(screen.getByText("Agentic Workspace")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create new run" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Search runs, agents" }),
    ).toBeInTheDocument();

    const filters = screen.getByTestId("run-sidebar-filters");
    const filterButtons = within(filters).getAllByRole("button");
    expect(filterButtons).toHaveLength(4);

    const nowrapRow = filters.querySelector("div.flex-nowrap");
    expect(nowrapRow).toBeInTheDocument();
    expect(nowrapRow?.className).not.toContain("flex-wrap");
  });

  it("clicking Active filters running runs", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.getByText("Q3 revenue analysis")).toBeInTheDocument();
    expect(screen.getByText("Compliance scan · EU-DSA")).toBeInTheDocument();
    expect(screen.queryByText("Vendor invoice triage")).not.toBeInTheDocument();
  });

  it("clicking Pending shows PENDING and BLOCKED runs", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Pending" }));

    expect(screen.getByText("Vendor invoice triage")).toBeInTheDocument();
    expect(screen.getByText("Weekly KPI digest")).toBeInTheDocument();
    expect(
      screen.queryByText("Customer escalation #4821"),
    ).not.toBeInTheDocument();
  });

  it("clicking Failed shows failed runs", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Failed" }));

    expect(screen.getByText("Customer escalation #4821")).toBeInTheDocument();
    expect(screen.queryByText("Q3 revenue analysis")).not.toBeInTheDocument();
  });

  it("search filters by run title and agent name", () => {
    render(
      <RunSidebar
        run={MOCK_AGENT_WORKSPACE_RUN}
        theme={workspaceLightTheme}
        runGroups={MOCK_RUN_GROUPS}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Search runs, agents" });

    fireEvent.change(input, { target: { value: "invoice" } });
    expect(screen.getByText("Vendor invoice triage")).toBeInTheDocument();
    expect(screen.queryByText("Q3 revenue analysis")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "support_router" } });
    expect(screen.getByText("Customer escalation #4821")).toBeInTheDocument();
  });

  it("selected run state still works via local fallback", () => {
    render(
      <RunSidebar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceLightTheme} />,
    );

    const target = screen.getByRole("button", {
      name: /Vendor invoice triage/i,
    });
    fireEvent.click(target);

    expect(target).toHaveAttribute("aria-current", "true");
  });
});
