import { TRACE_HANDOFF_ITEMS, TRACE_TIMELINE_ITEMS } from "../constants";
import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

export function TraceSummarySection({ theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const toneColor = (tone: "green" | "blue" | "amber") => (tone === "green" ? theme.success : tone === "amber" ? theme.warning : theme.traceBlue);
  return (
    <section className="space-y-3 text-xs">
      <article className="rounded-lg border p-4" style={{ borderColor: theme.successBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Trace · stage timeline</h3>
        <div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
        <div className="relative mt-2 space-y-2 pl-4">
          <span className="absolute left-[5px] top-0 h-full w-px" style={{ backgroundColor: theme.panelBorder }} />
          {TRACE_TIMELINE_ITEMS.map((item) => (
            <div key={item.id} className="relative">
              <span className="absolute -left-[14px] top-1.5 h-2.5 w-2.5 rounded-full border" style={{ backgroundColor: toneColor(item.tone), borderColor: toneColor(item.tone) }} />
              <p className="text-[10px]" style={{ color: theme.textTertiary }}>{item.time}</p>
              <p className="text-[12px] font-medium" style={{ color: theme.textPrimary }}>{item.title}</p>
              <p className="text-[11px]" style={{ color: theme.textTertiary }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Handoff verification</h3>
        <div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
        <div className="mt-2 space-y-1.5">
          {TRACE_HANDOFF_ITEMS.map((item) => <div key={item.id} className="flex justify-between gap-3"><span style={{ color: theme.textTertiary }}>{item.label}</span><span style={{ color: item.tone === "success" ? theme.success : theme.textPrimary }}>{item.value}</span></div>)}
        </div>
      </article>
      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <div className="flex items-center justify-between gap-2"><h3 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Audit replay</h3>
          <button type="button" className="rounded border px-2 py-0.5 text-[11px]" style={{ borderColor: theme.panelBorder, color: theme.textSecondary }} onClick={() => {
            // TODO(no-op): connect replay button to audit timeline playback API.
          }}>▷ Replay</button></div>
        <p className="mt-2 text-[11px]" style={{ color: theme.textTertiary }}>Step-through the run deterministically — same prompts, same tools, same output. Useful for incident review and reproducibility.</p>
      </article>
    </section>
  );
}
