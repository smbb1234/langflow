import { WORKSPACE_TABS, WORKSPACE_TAB_LABELS } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { WorkspaceTab } from "../types";

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
    <div
      className="h-[39px] overflow-x-auto overflow-y-hidden border-b px-2"
      style={{
        borderColor: theme.panelBorder,
        backgroundColor: theme.panelBg,
      }}
    >
      <div className="flex h-full min-w-max items-end gap-1">
        {WORKSPACE_TABS.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              className="h-full shrink-0 rounded-t-md px-3 text-xs font-medium"
              style={{
                color: isActive ? theme.textPrimary : theme.textSecondary,
                borderBottom: isActive ? `2px solid ${theme.primaryStrong}` : "2px solid transparent",
                backgroundColor: isActive ? theme.surfaceMuted : "transparent",
              }}
              onClick={() => onTabChange(tab)}
            >
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                {WORKSPACE_TAB_LABELS[tab]}
                {tabDots?.[tab] ? <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.error }} /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
