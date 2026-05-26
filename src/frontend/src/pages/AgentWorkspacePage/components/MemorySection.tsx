import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

const scopeTone: Record<"run" | "session" | "agent", "default" | "info" | "success"> = {
  run: "info",
  session: "default",
  agent: "success",
};

function ScopePill({ scope, theme }: { scope: "run" | "session" | "agent"; theme: WorkspaceTheme }) {
  const tone = scopeTone[scope];
  const style =
    tone === "info"
      ? { backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.textPrimary }
      : tone === "success"
        ? { backgroundColor: theme.surfaceGreen, borderColor: theme.successBorder, color: theme.textPrimary }
        : { backgroundColor: theme.pillBg, borderColor: theme.pillBorder, color: theme.textSecondary };

  return (
    <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide" style={style}>
      {scope}
    </span>
  );
}

export function MemorySection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>
        Memory ledger
      </h3>

      <div className="space-y-2">
        {/* memoryLedger entries are rendered as immutable snapshots for this static inspector view. */}
        {run.memoryLedger.map((item) => (
          <article key={item.id} className="rounded-md border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 truncate text-[12px]" style={{ color: theme.textPrimary }}>
                {item.key}={item.value}
              </p>
              <ScopePill scope={item.scope} theme={theme} />
            </div>
            <p className="mt-1 text-[11px]" style={{ color: theme.textSecondary }}>
              reason: persisted from {item.scope} context
            </p>
            <p className="mt-0.5 text-[11px]" style={{ color: theme.textTertiary }}>
              expiry: {item.updatedAt}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-md border px-3 py-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
        <p style={{ color: theme.textPrimary }}>Writes this run: 2</p>
        <p className="mt-0.5" style={{ color: theme.textSecondary }}>Sensitive PII: none stored</p>
        <p className="mt-0.5" style={{ color: theme.textSecondary }}>Rollback window: 7 days</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-[11px]"
          style={{ borderColor: theme.pillBorder, backgroundColor: theme.surfaceBase, color: theme.textPrimary }}
          onClick={() => {
            // TODO(no-op): connect rollback action to memory safety API.
          }}
        >
          Rollback last
        </button>
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-[11px]"
          style={{ borderColor: theme.pillBorder, backgroundColor: theme.surfaceBase, color: theme.textPrimary }}
          onClick={() => {
            // TODO(no-op): connect export action to ledger export API.
          }}
        >
          Export ledger
        </button>
      </div>
    </section>
  );
}
