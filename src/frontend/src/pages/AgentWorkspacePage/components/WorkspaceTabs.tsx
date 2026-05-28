import { useRef, type WheelEventHandler } from "react";

import { WORKSPACE_TABS, WORKSPACE_TAB_LABELS } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { WorkspaceTab } from "../types";

type WorkspaceTabsProps = {
  theme: WorkspaceTheme;
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
};

export function WorkspaceTabs({ theme, activeTab = "overview", onTabChange }: WorkspaceTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    if (!scrollRef.current || event.deltaY === 0) return;
    event.preventDefault();
    scrollRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div className="h-[40px] border-b" style={{ borderColor: theme.panelBorder }}>
      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="h-full overflow-x-auto overflow-y-hidden px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex h-full min-w-max items-center gap-5 text-[12px]">
          {WORKSPACE_TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                aria-selected={isActive}
                role="tab"
                className="inline-flex shrink-0 items-center gap-1.5"
                style={{ color: isActive ? theme.textPrimary : theme.textTertiary, fontWeight: isActive ? 600 : 400 }}
                type="button"
                onClick={() => {
                  // TODO: switch tab-specific run content when non-overview panels are implemented.
                  onTabChange?.(tab);
                }}
              >
                <span className="whitespace-nowrap">{WORKSPACE_TAB_LABELS[tab]}</span>
                {tab === "guardrails" ? (
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.warning }} />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
