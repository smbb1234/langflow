import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RunInspectorPanel } from "../components/RunInspectorPanel";
import { TraceConsoleBar } from "../components/TraceConsoleBar";
import { TraceConsoleHeader } from "../components/TraceConsoleHeader";
import { TraceGuardrailsView } from "../components/TraceGuardrailsView";
import { TraceRawEvents } from "../components/TraceRawEvents";
import { TraceRetriesView } from "../components/TraceRetriesView";
import { TraceTimeline } from "../components/TraceTimeline";
import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceDarkTheme } from "../theme";

describe("TraceConsoleHeader", () => {
  it("renders controls, tabs, and stats", async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();

    render(
      <TraceConsoleHeader
        run={MOCK_AGENT_WORKSPACE_RUN}
        theme={workspaceDarkTheme}
        activeTab="timeline"
        collapsed={false}
        onTabChange={onTabChange}
        onToggleCollapsed={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Collapse trace console" })).toBeInTheDocument();
    expect(screen.getByText("Trace Console")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Timeline tab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Raw events tab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Guardrails tab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Retries / latency tab" })).toBeInTheDocument();
    expect(screen.getByText(/retries/)).toBeInTheDocument();
    expect(screen.getByText(/spike/)).toBeInTheDocument();
    expect(screen.getByText(/128 events/)).toBeInTheDocument();
    expect(screen.getByText(/budget/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open Raw events tab" }));
    expect(onTabChange).toHaveBeenCalledWith("raw");
  });
});

describe("TraceConsoleBar", () => {
  it("supports collapsed and expanded tab content", async () => {
    const user = userEvent.setup();
    render(<TraceConsoleBar run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} defaultTab="timeline" />);

    expect(screen.getByText("planner_agent")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Collapse trace console" }));
    expect(screen.queryByText("planner_agent")).not.toBeInTheDocument();
  });

  it("uses fallback tabs when no trace tabs are provided", () => {
    render(
      <TraceConsoleBar
        run={{ ...MOCK_AGENT_WORKSPACE_RUN, trace: { ...MOCK_AGENT_WORKSPACE_RUN.trace, tabs: [] } }}
        theme={workspaceDarkTheme}
      />,
    );

    expect(screen.getByRole("button", { name: "Open Timeline tab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Raw events tab" })).toBeInTheDocument();
  });
});

describe("trace views", () => {
  it("renders timeline lanes, axis labels, and segments", () => {
    render(<TraceTimeline run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.getByText("planner_agent")).toBeInTheDocument();
    expect(screen.getByText("14:22:01")).toBeInTheDocument();
    expect(screen.getByText("now")).toBeInTheDocument();
  });

  it("raw events renders headers and status", () => {
    render(<TraceRawEvents run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.getByText("time")).toBeInTheDocument();
    expect(screen.getByText("event")).toBeInTheDocument();
    expect(screen.getAllByText("ok").length).toBeGreaterThan(0);
    expect(screen.getByText("warning")).toBeInTheDocument();
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("guardrails and retries render cards and empty state", () => {
    render(<TraceGuardrailsView run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);
    expect(screen.getByText("Injection")).toBeInTheDocument();

    render(<TraceRetriesView run={{ ...MOCK_AGENT_WORKSPACE_RUN, latencySamples: [] }} theme={workspaceDarkTheme} />);
    expect(screen.getByText("No latency samples available.")).toBeInTheDocument();
    expect(screen.getByText("p50")).toBeInTheDocument();
    expect(screen.getByText("p95")).toBeInTheDocument();
    expect(screen.getByText("max")).toBeInTheDocument();
    expect(screen.getByText("retries")).toBeInTheDocument();
  });
});

describe("RunInspectorPanel", () => {
  it("switches tabs and renders compact tool card", async () => {
    const user = userEvent.setup();
    const onTabChange = jest.fn();
    render(
      <RunInspectorPanel run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} activeTab="overview" onTabChange={onTabChange} />,
    );

    expect(screen.getByText("Current run")).toBeInTheDocument();
    expect(screen.getByTestId("tool-choice-layout-compact")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Guardrails" }));
    expect(onTabChange).toHaveBeenCalledWith("guardrails");
  });
});
