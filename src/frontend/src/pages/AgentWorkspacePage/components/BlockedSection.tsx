import type { WorkspaceTheme } from "../theme";

const blockedItems = [
  "Approval — post_to_slack",
  "Eval drift — tone.formal below threshold (0.71 / 0.80)",
];

export function BlockedSection({ theme }: { theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.warning }}>Blocked / unresolved</h3>
      <ul className="space-y-2 text-xs" style={{ color: theme.textPrimary }}>
        {blockedItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-[6px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: theme.warning }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
