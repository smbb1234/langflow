import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";
import { TraceConsoleBar } from "./TraceConsoleBar";
import { WorkspacePromptInput } from "./WorkspacePromptInput";

export function RunMainPanel({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const chip = { backgroundColor: theme.surfaceMuted, border: `1px solid ${theme.panelBorder}`, color: theme.textSecondary };
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col" style={{ backgroundColor: theme.pageBg }}>
      <header className="flex h-[60px] items-center justify-between border-b px-4" style={{ borderColor: theme.panelBorder }}>
        <div>
          <h1 className="text-[16px] font-semibold" style={{ color: theme.textPrimary }}>Q3 revenue analysis</h1>
          <div className="mt-1 flex gap-2 text-[11px]"><span className="rounded px-2 py-0.5" style={chip}>run · r_8f2c14a</span><span className="rounded px-2 py-0.5" style={chip}>finance_sql_agent → chart_agent</span></div>
        </div>
        <div className="flex gap-2 text-xs"><button type="button" className="rounded px-2 py-1" style={chip}>⑂ Branch</button><button type="button" className="rounded px-2 py-1" style={chip}>⬆ Export</button><button type="button" className="rounded px-2 py-1" style={chip}>···</button></div>
      </header>
      <div className="flex h-[40px] items-center gap-5 border-b px-4 text-[12px]" style={{ borderColor: theme.panelBorder }}>
        <span style={{ color: theme.textPrimary, fontWeight: 600 }}>Overview</span><span style={{ color: theme.textTertiary }}>Guardrails •</span><span style={{ color: theme.textTertiary }}>Evidence</span><span style={{ color: theme.textTertiary }}>Trace</span>
      </div>
      <section className="h-[440px] overflow-y-auto px-4 py-4">
        <p className="text-[12px]" style={{ color: theme.textSecondary }}>You  · 14:22:01</p>
        <p className="mt-1 text-[13px]" style={{ color: theme.textPrimary }}>Break down Q3 revenue by product line vs Q2, exclude internal test accounts, and flag any line that dropped &gt;5%. Use the curated finance warehouse.</p>
        <div className="mt-5 rounded-[8px] border p-3" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
          <p className="text-[12px]" style={{ color: theme.textSecondary }}>finance_sql_agent · planning · 14:22:03</p>
          <p className="mt-1 text-[13px]" style={{ color: theme.textPrimary }}>I&apos;ll run this in 4 steps. Plan compiled below — pre-flight checks all passed.</p>
          <ul className="mt-3 space-y-1 text-[12px]" style={{ color: theme.textSecondary }}>
            <li>✓ Validate scope: warehouse=finance_curated, exclude test_account_ids</li>
            <li>✓ SQL: revenue by product_line for Q2/Q3</li>
            <li>✓ Compute QoQ delta, flag drops &gt; 5%</li>
            <li>4 Render comparison chart + summary table <span style={{ color: theme.primaryStrong, fontWeight: 600 }}>RUNNING</span></li>
          </ul>
        </div>
        <div className="mt-3 rounded-[8px] border px-3 py-2 text-[12px]" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}>
          ▼ Tool choice — why Snowflake SQL <span className="ml-3" style={{ color: theme.textTertiary }}>tool · run_sql</span>
        </div>
      </section>
      <div className="h-[100px]"><WorkspacePromptInput theme={theme} /></div>
      <div className="h-[162px]"><TraceConsoleBar run={run} theme={theme} /></div>
    </main>
  );
}
