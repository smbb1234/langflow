import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

const GUARDRAIL_CARDS = [
  { label: "Injection", value: "0" },
  { label: "DLP hits", value: "0" },
  { label: "Schema", value: "1 chart_spec.unit" },
  { label: "Policy", value: "0" },
  { label: "Cost", value: "1.4%" },
  { label: "Loops", value: "0" },
];

export function TraceGuardrailsView({ run: _run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <div className="h-[121px] overflow-auto px-3 py-2 text-[11px]" style={{ color: theme.textSecondary }}>
      <div className="grid grid-cols-3 gap-2">
        {GUARDRAIL_CARDS.map((card) => (
          <div key={card.label} className="rounded border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceBase }}>
            <p className="text-[10px] uppercase tracking-wide" style={{ color: theme.textTertiary }}>{card.label}</p>
            <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
