import { fireEvent, render, screen } from "@testing-library/react";

import { MOCK_AGENT_WORKSPACE_RUN } from "../constants";
import { workspaceDarkTheme } from "../theme";
import { ConversationThread } from "../components/ConversationThread";
import { StepListCard } from "../components/StepListCard";
import { ToolChoiceCard } from "../components/ToolChoiceCard";
import { WorkspacePromptInput } from "../components/WorkspacePromptInput";

describe("ConversationThread", () => {
  it("renders user/assistant messages, planning cards, result section, and centered wrapper", () => {
    render(<ConversationThread run={MOCK_AGENT_WORKSPACE_RUN} theme={workspaceDarkTheme} />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText(MOCK_AGENT_WORKSPACE_RUN.agentName)).toBeInTheDocument();
    expect(screen.getByText(/I'll run this in/i)).toBeInTheDocument();
    expect(screen.getByText("Tool choice — why Snowflake SQL")).toBeInTheDocument();
    expect(screen.getByText(/Analyzed result/i)).toBeInTheDocument();
    expect(screen.getByTestId("conversation-centered-column")).toBeInTheDocument();
  });
});

describe("StepListCard", () => {
  it("renders all plan steps with status markers and long labels", () => {
    const plan = [
      { id: "s1", index: 1, label: "Completed step", status: "DONE" as const },
      { id: "s2", index: 2, label: "Active step", status: "ACTIVE" as const },
      {
        id: "s3",
        index: 3,
        label: "This is an intentionally long plan label that should stay contained in the row layout",
        status: "PENDING" as const,
      },
    ];

    render(<StepListCard plan={plan} theme={workspaceDarkTheme} />);

    expect(screen.getByText("Completed step")).toBeInTheDocument();
    expect(screen.getByText("Active step")).toBeInTheDocument();
    expect(screen.getByText(/intentionally long plan label/i)).toBeInTheDocument();
    expect(screen.getByText("RUNNING")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });
});

describe("ToolChoiceCard", () => {
  it("renders non-compact horizontal grid layout with selected summary and scores", () => {
    render(<ToolChoiceCard toolChoices={MOCK_AGENT_WORKSPACE_RUN.toolChoices} theme={workspaceDarkTheme} compact={false} />);

    expect(screen.getByTestId("tool-choice-layout-main")).toBeInTheDocument();
    expect(screen.getByText("Selected: snowflake.run_sql")).toBeInTheDocument();
    expect(screen.getByText("0.97")).toBeInTheDocument();
  });

  it("renders compact vertical layout", () => {
    render(<ToolChoiceCard toolChoices={MOCK_AGENT_WORKSPACE_RUN.toolChoices} theme={workspaceDarkTheme} compact />);

    expect(screen.getByTestId("tool-choice-layout-compact")).toBeInTheDocument();
  });
});

describe("WorkspacePromptInput", () => {
  it("renders composer controls and supports interactions", () => {
    const onSubmitPrompt = jest.fn();
    const onAttach = jest.fn();
    const onSelectEvidenceScope = jest.fn();
    const onSelectAgent = jest.fn();

    render(
      <WorkspacePromptInput
        run={MOCK_AGENT_WORKSPACE_RUN}
        theme={workspaceDarkTheme}
        onSubmitPrompt={onSubmitPrompt}
        onAttach={onAttach}
        onSelectEvidenceScope={onSelectEvidenceScope}
        onSelectAgent={onSelectAgent}
      />,
    );

    const textarea = screen.getByLabelText("Continue run prompt") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Check Q3 deltas" } });
    expect(textarea.value).toBe("Check Q3 deltas");

    fireEvent.keyDown(textarea, { key: "Enter", ctrlKey: true });
    expect(onSubmitPrompt).toHaveBeenCalledWith("Check Q3 deltas");
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
    expect(onSubmitPrompt).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole("button", { name: /attach/i }));
    fireEvent.click(screen.getByRole("button", { name: /finance_curated/i }));
    fireEvent.click(screen.getByRole("button", { name: /finance_sql_agent/i }));
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(onAttach).toHaveBeenCalled();
    expect(onSelectEvidenceScope).toHaveBeenCalled();
    expect(onSelectAgent).toHaveBeenCalled();
    expect(screen.getByTestId("workspace-composer-centered-wrapper")).toBeInTheDocument();
  });
});
