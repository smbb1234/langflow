import { GUARDRAIL_EVENT_FEED } from "../constants";
import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

const pillByStatus = {
  pass: { text: "pass", dot: "✓" },
  warn: { text: "warn", dot: "▲" },
  warning: { text: "warn", dot: "▲" },
  failed: { text: "fail", dot: "✕" },
} as const;

function StatusPill({ status, theme }: { status: "pass" | "warn" | "warning" | "failed"; theme: WorkspaceTheme }) {
  const isWarn = status === "warn" || status === "warning";
  const isFailed = status === "failed";
  const color = isFailed ? theme.error : isWarn ? theme.warning : theme.success;
  return <span className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase" style={{ borderColor: color, color }}>{pillByStatus[status].text}</span>;
}

export function GuardrailsSection({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  return (
    <section className="space-y-3 text-xs">
      <article className="rounded-lg border p-4" style={{ borderColor: theme.successBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[14px] font-semibold" style={{ color: theme.textPrimary }}>Prompt Security Center</h3>
            <p className="mt-2 text-2xl font-semibold" style={{ color: theme.success }}>12/12</p>
            <p className="text-[11px]" style={{ color: theme.textTertiary }}>checks passing in last 5m</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: theme.successBorder, color: theme.success }}><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.success }} />healthy</span>
            <p className="mt-1 text-[11px]" style={{ color: theme.textTertiary }}>last scan 14:22:09</p>
          </div>
        </div>
      </article>

      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <h4 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Pre-action checks</h4>
        <div className="mt-2 h-px" style={{ backgroundColor: theme.panelBorder }} />
        {run.guardrailChecks.map((check, index) => {
          const isWarn = check.status === "warn" || check.status === "warning";
          return (
            <div key={check.id}>
              <div className="flex items-start justify-between gap-2 py-2">
                <div className="flex min-w-0 gap-2">
                  <span className="mt-0.5 text-[11px]" style={{ color: isWarn ? theme.warning : theme.success }}>{isWarn ? "▲" : "✓"}</span>
                  <div className="min-w-0">
                    <p className="text-[12px]" style={{ color: theme.textPrimary }}>{check.name}</p>
                    <p className="text-[11px]" style={{ color: theme.textTertiary }}>{check.detail}</p>
                  </div>
                </div>
                <StatusPill status={check.status} theme={theme} />
              </div>
              {index < run.guardrailChecks.length - 1 ? <div className="h-px" style={{ backgroundColor: theme.panelBorder }} /> : null}
            </div>
          );
        })}
      </article>

      <article className="rounded-lg border p-4" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface, boxShadow: theme.shadowSoft }}>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>Guardrail event feed</h4>
          <span className="text-[11px] uppercase" style={{ color: theme.textTertiary }}>live</span>
        </div>
        {GUARDRAIL_EVENT_FEED.map((event, index) => (
          <div key={event.id}>
            <div className="grid grid-cols-[64px_1fr] gap-2 py-1.5">
              <span className="text-[11px]" style={{ color: theme.textTertiary }}>{event.timestamp}</span>
              <span className="min-w-0 text-[12px]" style={{ color: theme.textPrimary }}>{event.message}</span>
            </div>
            {index < GUARDRAIL_EVENT_FEED.length - 1 ? <div className="h-px" style={{ backgroundColor: theme.panelBorder }} /> : null}
          </div>
        ))}
      </article>
    </section>
  );
}
