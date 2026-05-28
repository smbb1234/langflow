import { render, screen } from "@testing-library/react";

import { workspaceLightTheme } from "../theme";
import { InspectorTabs } from "./InspectorTabs";

describe("InspectorTabs", () => {
  it("shows exactly four visible tabs, selects overview, and renders orange guardrails dot", () => {
    render(
      <InspectorTabs
        activeTab="overview"
        onTabChange={jest.fn()}
        theme={workspaceLightTheme}
        tabDots={{ guardrails: true }}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(4);

    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Guardrails" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Trace" })).toBeInTheDocument();

    expect(screen.queryByRole("tab", { name: "Memory" })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: "Ops" })).not.toBeInTheDocument();

    const guardrailsDot = screen.getByRole("tab", { name: "Guardrails" }).querySelector("span.h-1\\.5.w-1\\.5.rounded-full");
    expect(guardrailsDot).toBeInTheDocument();
    expect(guardrailsDot).toHaveStyle({ backgroundColor: "rgb(249, 115, 22)" });
  });
});
