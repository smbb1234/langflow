import { fireEvent, render, screen } from "@testing-library/react";

import { ApprovalCard } from "./components/ApprovalCard";
import { MOCK_AGENT_WORKSPACE_RUN } from "./constants";

describe("ApprovalCard", () => {
  it("renders approval action buttons", () => {
    render(<ApprovalCard run={MOCK_AGENT_WORKSPACE_RUN} />);

    expect(screen.getByRole("button", { name: "Review" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deny" })).toBeInTheDocument();
  });

  it("triggers approval callback when action buttons are clicked", () => {
    const onAction = jest.fn();

    render(<ApprovalCard run={MOCK_AGENT_WORKSPACE_RUN} onAction={onAction} />);

    fireEvent.click(screen.getByRole("button", { name: "Review" }));
    expect(onAction).toHaveBeenNthCalledWith(1, "review", "approval-1");

    fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    expect(onAction).toHaveBeenNthCalledWith(2, "approve", "approval-1");

    fireEvent.click(screen.getByRole("button", { name: "Deny" }));
    expect(onAction).toHaveBeenNthCalledWith(3, "deny", "approval-1");
  });
});
