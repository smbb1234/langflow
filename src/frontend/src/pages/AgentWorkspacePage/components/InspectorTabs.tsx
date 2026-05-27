import { useRef, type WheelEventHandler } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const onWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    const container = scrollRef.current;
    if (!container) return;

    const hasHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const delta = hasHorizontalIntent ? event.deltaX : event.deltaY;

    if (delta === 0) return;

    event.preventDefault();
    container.scrollLeft += delta;
  };

  return (
    <div
      className="relative h-[39px] border-b"
      style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}
    >
      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="agent-workspace-hide-scrollbar h-full min-w-0 overflow-x-auto overflow-y-hidden"
      >
        <div className="flex h-full min-w-max items-end gap-1">
          {WORKSPACE_TABS.map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                aria-selected={isActive}
                role="tab"
                type="button"
                className="h-full shrink-0 rounded-t-md px-3 text-sm font-medium"
                style={{
                  color: isActive ? theme.textPrimary : theme.textSecondary,
                  borderBottom: isActive
                    ? `2px solid ${theme.primaryStrong}`
                    : "2px solid transparent",
                  backgroundColor: isActive
                    ? theme.surfaceMuted
                    : "transparent",
                }}
                onClick={() => onTabChange(tab)}
              >
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  {WORKSPACE_TAB_LABELS[tab]}
                  {tabDots?.[tab] ? (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: theme.error }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
