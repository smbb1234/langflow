import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function BlockedSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const blockedItems = [run.approval.title, ...run.uncertainty.reasons].filter(Boolean);
  return (
    <section className="space-y-3 rounded-md border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: theme.warning }}>Blocked / unresolved</h3>
      <ul className="space-y-2 text-sm" style={{ color: theme.textPrimary }}>
        {blockedItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-[6px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: theme.warning }} />
            <span>{item}</span>
          </li>
        ))}
        {blockedItems.length === 0 && (
          <li className="text-sm" style={{ color: theme.textTertiary }}>
            No blocked items.
          </li>
        )}
      </ul>
    </section>
  );
}
