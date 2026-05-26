import { useMemo, useRef, type WheelEventHandler } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const hasHiddenTabsOnRight = useMemo(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollWidth - el.clientWidth - el.scrollLeft > 8;
  }, [activeTab]);

  const scrollTabs = (left: number) => {
    scrollRef.current?.scrollBy({ left, behavior: "smooth" });
  };

  const onWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    if (!scrollRef.current || event.deltaY === 0) return;
    event.preventDefault();
    scrollRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div
      className="relative h-[39px] border-b"
      style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}
    >
      <button
        type="button"
        aria-label="Scroll tabs left"
        className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-md border p-1"
        style={{
          borderColor: theme.panelBorder,
          backgroundColor: theme.panelBg,
          color: theme.textSecondary,
        }}
        onClick={() => scrollTabs(-120)}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <div
        ref={scrollRef}
        onWheel={onWheel}
        className="h-full overflow-x-auto overflow-y-hidden px-8"
        style={{ scrollbarWidth: "thin" }}
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

      {hasHiddenTabsOnRight ? (
        <div
          className="pointer-events-none absolute right-8 top-0 h-full w-8"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.panelBg})`,
          }}
        />
      ) : null}

      <button
        type="button"
        aria-label="Scroll tabs right"
        className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-md border p-1"
        style={{
          borderColor: theme.panelBorder,
          backgroundColor: theme.panelBg,
          color: theme.textSecondary,
        }}
        onClick={() => scrollTabs(120)}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
