import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

export function GuardrailsSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const { passed, total, status } = run.guardrails;

  return (
    <section className="space-y-3 rounded-md border p-4 text-xs" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>Guardrails</h3>
      <div style={{ color: theme.textPrimary }}>{passed} / {total} checks passed</div>
      <div style={{ color: theme.textTertiary }}>Status: {status}</div>
      <div className="rounded border px-3 py-2" style={{ borderColor: theme.warningBorder, backgroundColor: theme.surfaceWarning, color: theme.warning }}>
        tone.formal warning placeholder
      </div>
      {/* TODO: wire to guardrail telemetry API */}
    </section>
  );
}
