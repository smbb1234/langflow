import type { WorkspaceTheme } from "../theme";

export function UncertaintySection({ theme }: { theme: WorkspaceTheme }) {
  return (
    <section className="rounded-md border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Uncertainty</h3>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-3xl font-semibold leading-none" style={{ color: theme.textPrimary }}>0.91</div>
          <div className="mt-1 text-xs" style={{ color: theme.textTertiary }}>answer confidence</div>
        </div>
        <svg width="120" height="36" viewBox="0 0 120 36" aria-label="uncertainty sparkline">
          <polyline
            points="2,28 18,24 34,25 50,18 66,20 82,14 98,16 114,8"
            fill="none"
            stroke={theme.primaryStrong}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="2" y1="32" x2="116" y2="32" stroke={theme.panelBorder} strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
