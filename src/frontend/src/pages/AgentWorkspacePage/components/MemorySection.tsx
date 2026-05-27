import { MEMORY_SAFETY_ITEMS } from "../constants";
import type { AgentWorkspaceRun, MemoryLedgerItem } from "../types";
import type { WorkspaceTheme } from "../theme";

function scopeStyle(scope: MemoryLedgerItem["scope"], theme: WorkspaceTheme) {
  if (scope === "user") return { backgroundColor: theme.surfaceGreen, borderColor: theme.successBorder, color: theme.success };
  if (scope === "session") return { backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.traceBlue };
  return { backgroundColor: theme.surfaceWarning, borderColor: theme.warningBorder, color: theme.warning };
}

export function MemorySection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return <section className="space-y-3 text-xs">
    <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Memory ledger</h3>
      <p className="mt-1 text-[11px]" style={{ color: theme.textTertiary }}>Every write is logged with reason and scope. You can rollback any row.</p>
      <div className="mt-2">{run.memoryLedger.map((item, idx) => <div key={item.id}>{idx > 0 ? <div className="h-px" style={{ backgroundColor: theme.panelBorder }} /> : null}
      <div className="py-2"><div className="flex items-start justify-between gap-2"><p className="text-[12px]" style={{ color: theme.textPrimary }}>{item.value ? `${item.key} = ${item.value}` : item.key}</p><span className="rounded-full border px-2 py-0.5 text-[10px] uppercase" style={scopeStyle(item.scope, theme)}>{item.scope}</span></div>
      <div className="mt-1 flex justify-between"><span className="text-[11px]" style={{ color: theme.textTertiary }}>{item.reason}</span><span className="text-[11px]" style={{ color: theme.textTertiary }}>{item.expiry}</span></div></div></div>)}</div>
    </article>
    <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Safety</h3><div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
      <div className="mt-2 space-y-1.5">{MEMORY_SAFETY_ITEMS.map((item) => <div key={item.id} className="flex justify-between"><span style={{ color: theme.textTertiary }}>{item.label}</span><span style={{ color: item.tone === "success" ? theme.success : theme.textPrimary }}>{item.value}</span></div>)}</div>
      <div className="mt-3 flex gap-2"><button type="button" className="rounded-md px-3 py-1.5 text-[11px]" style={{ backgroundColor: theme.primaryStrong, color: theme.pageBg }} onClick={() => {
        // TODO(no-op): connect rollback action to memory safety API.
      }}>Rollback last</button>
      <button type="button" className="rounded-md border px-3 py-1.5 text-[11px]" style={{ borderColor: theme.panelBorder, color: theme.textSecondary }} onClick={() => {
        // TODO(no-op): connect export action to ledger export API.
      }}>Export ledger</button></div>
    </article>
  </section>;
}
