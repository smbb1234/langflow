import { fireEvent, render, screen } from "@testing-library/react";

import AgentWorkspacePage from ".";

describe("AgentWorkspacePage", () => {
  it("renders workspace shell and keeps actions local/no-op", () => {
    render(<AgentWorkspacePage />);

    expect(screen.getAllByText("Q3 revenue analysis").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Branch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New run" })).toBeInTheDocument();

    expect(screen.getByText("Local status: none")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Review" }));
    expect(screen.getByText("Local status: review")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    expect(screen.getByText("Local status: approved")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Deny" }));
    expect(screen.getByText("Local status: denied")).toBeInTheDocument();
  });
});
