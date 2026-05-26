import { MAIN_WORKSPACE_TABS, WORKSPACE_TAB_LABELS } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { WorkspaceTab } from "../types";

type WorkspaceTabsProps = {
  theme: WorkspaceTheme;
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
};

export function WorkspaceTabs({ theme, activeTab = "overview", onTabChange }: WorkspaceTabsProps) {
  return (
    <div className="flex h-[40px] items-center gap-5 border-b px-4 text-[12px]" style={{ borderColor: theme.panelBorder }}>
      {MAIN_WORKSPACE_TABS.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            className="inline-flex items-center gap-1.5"
            style={{ color: isActive ? theme.textPrimary : theme.textTertiary, fontWeight: isActive ? 600 : 400 }}
            type="button"
            onClick={() => {
              // TODO: switch tab-specific run content when non-overview panels are implemented.
              onTabChange?.(tab);
            }}
          >
            {WORKSPACE_TAB_LABELS[tab]}
            {tab === "guardrails" ? (
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.warning }} />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
