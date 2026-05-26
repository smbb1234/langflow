import type { WorkspaceTheme } from "../theme";
import type { WorkspaceTab } from "../types";

const tabs: { id: WorkspaceTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "guardrails", label: "Guardrails" },
  { id: "evidence", label: "Evidence" },
  { id: "trace", label: "Trace" },
  { id: "memory", label: "Memory" },
  { id: "ops", label: "Ops" },
];

export function InspectorTabs({
  activeTab,
  onTabChange,
  theme,
  tabDots,
}: {
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  theme: WorkspaceTheme;
  tabDots?: Partial<Record<WorkspaceTab, boolean>>;
}) {
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
            <span className="inline-flex items-center gap-1.5">
              {tab.label}
              {tabDots?.[tab.id] ? <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.error }} /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
