import { useMemo, useState } from "react";

import type { WorkspaceTheme } from "../theme";
import type { ToolChoice } from "../types";

type ToolChoiceCardProps = {
  toolChoices: ToolChoice[];
  theme: WorkspaceTheme;
  compact?: boolean;
};

export function ToolChoiceCard({ toolChoices, theme, compact = false }: ToolChoiceCardProps) {
  const [expanded, setExpanded] = useState(true);
  const selectedTool = useMemo(() => toolChoices.find((tool) => tool.selected) ?? toolChoices[0], [toolChoices]);

  return (
    <section className={compact ? "rounded-lg border" : "mt-2 rounded-lg border"} style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-left"
        onClick={() => setExpanded((value) => !value)}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span style={{ color: theme.textTertiary }}>{expanded ? "▼" : "▶"}</span>
          <span className="truncate text-[12px] font-medium" style={{ color: theme.textPrimary }}>
            Tool choice — why Snowflake SQL
          </span>
          <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ backgroundColor: theme.pillBg, color: theme.textSecondary }}>
            tool · run_sql
          </span>
        </div>
      </button>

      {expanded ? (
        <div className={compact ? "space-y-1 border-t px-3 py-2" : "space-y-2 border-t px-3 py-2"} style={{ borderColor: theme.panelBorder }}>
          {/* TODO: replace with real tool-selection explanation API payload. */}
          <div
            className={compact ? "space-y-1" : "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"}
            data-testid={compact ? "tool-choice-layout-compact" : "tool-choice-layout-main"}
          >
            {toolChoices.map((choice) => (
            <div
              key={choice.id}
              className={compact ? "rounded-md border px-2 py-1.5" : "rounded-md border px-3 py-2"}
              style={{
                borderColor: choice.selected ? theme.surfaceBlueBorder : theme.panelBorder,
                backgroundColor: choice.selected ? theme.surfaceBlue : theme.surface,
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="truncate" style={{ color: theme.textPrimary }}>{choice.name}</span>
                <span style={{ color: theme.textSecondary }}>{choice.score.toFixed(2)}</span>
              </div>
              <p className="mt-0.5 text-[11px]" style={{ color: theme.textSecondary }}>
                {choice.reason}
              </p>
            </div>
            ))}
          </div>
          {!toolChoices.length ? (
            <p className="text-[11px]" style={{ color: theme.textTertiary }}>
              No tool candidates available.
            </p>
          ) : null}
          {selectedTool ? (
            <p className="text-[11px]" style={{ color: theme.textTertiary }}>
              Selected: {selectedTool.name}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
