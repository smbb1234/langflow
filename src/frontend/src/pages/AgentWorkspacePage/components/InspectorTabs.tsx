import type { WorkspaceTheme } from "../theme";
import type { WorkspaceTab } from "../types";

const tabs: { id: WorkspaceTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "guardrails", label: "Guardrails" },
  { id: "evidence", label: "Evidence" },
  { id: "trace", label: "Trace" },
];

export function InspectorTabs({ activeTab, onTabChange, theme }: { activeTab: WorkspaceTab; onTabChange: (tab: WorkspaceTab) => void; theme: WorkspaceTheme }) {
  return (
    <div className="flex h-[39px] items-end border-b px-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className="h-full rounded-t-md px-3 text-xs font-medium"
            style={{
              color: isActive ? theme.textPrimary : theme.textSecondary,
              borderBottom: isActive ? `2px solid ${theme.primaryStrong}` : "2px solid transparent",
              backgroundColor: isActive ? theme.surfaceMuted : "transparent",
            }}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
