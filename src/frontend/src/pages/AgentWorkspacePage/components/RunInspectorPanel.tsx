import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function RunInspectorPanel({ theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const currentRunRows = [
    { key: "Run ID", value: "r_8f2c14a" },
    { key: "Started", value: "14:22:01" },
    { key: "Active agent", value: "finance_sql_agent" },
    { key: "Stage", value: "4/6 · Tool" },
    { key: "Next checkpoint", value: "Validate" },
    { key: "Initiated by", value: "priya@acme" },
  ];

  return (
    <aside className="h-full w-[380px] overflow-y-auto border-l" style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}>
      <div className="flex h-[39px] items-center gap-4 border-b px-4 text-[12px]" style={{ borderColor: theme.panelBorder }}>
        <span style={{ color: theme.textPrimary, fontWeight: 600 }}>Overview</span><span style={{ color: theme.textTertiary }}>Guardrails</span><span style={{ color: theme.textTertiary }}>Evidence</span><span style={{ color: theme.textTertiary }}>Trace</span>
      </div>
      <div className="space-y-6 px-4 py-4 text-[12px]">
        <section>
          <h2 className="mb-2 font-semibold" style={{ color: theme.textPrimary }}>Current run</h2>
          {currentRunRows.map((row) => (
            <p key={row.key} className="flex items-center justify-between py-[4px]">
              <span style={{ color: theme.textMuted }}>{row.key}</span>
              <span style={{ color: theme.textPrimary }}>{row.value}</span>
            </p>
          ))}
        </section>
        <section>
          <h2 className="mb-2 font-semibold" style={{ color: theme.warning }}>Blocked / unresolved</h2>
          <p style={{ color: theme.textSecondary }}>Approval — post_to_slack</p>
          <p style={{ color: theme.textSecondary }}>Eval drift — tone.formal below threshold (0.71 / 0.80)</p>
        </section>
        <section>
          <h2 className="mb-1 font-semibold" style={{ color: theme.textPrimary }}>Uncertainty</h2>
          <p className="text-[40px] leading-none" style={{ color: theme.textPrimary }}>0.91</p>
          <p style={{ color: theme.textMuted }}>answer confidence</p>
        </section>
      </div>
    </aside>
  );
}
