import type { WorkspaceTheme } from "../theme";

export function TraceConsoleBar({ theme }: { theme: WorkspaceTheme }) {
  return (
    <footer
      className="h-[162px] border-t"
      style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelBg }}
    >
      <div
        className="flex h-[41px] items-center justify-between border-b px-3 text-[11px]"
        style={{ borderColor: theme.panelBorder, color: theme.textSecondary }}
      >
        <div className="flex gap-3">
          <span>Trace Console</span>
          <span>Timeline</span>
          <span>Raw events</span>
          <span>Guardrails</span>
          <span>Retries latency</span>
        </div>
        <div className="flex gap-3">
          <span>3 retries</span>
          <span>1 spike</span>
          <span>42 events</span>
          <span>budget $0.014 / $1.00</span>
        </div>
      </div>
      <div className="flex h-[121px]">
        <div className="w-[130px] px-2 py-2 text-[11px]" style={{ color: theme.textTertiary }}>
          <p>finance_sql_agent</p>
          <p>chart_agent</p>
          <p>tool · run_sql</p>
          <p>tool · render</p>
          <p>guardrails</p>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="relative min-w-[560px] px-2 py-2 text-[10px]" style={{ color: theme.textMuted }}>
            <div className="mb-1 flex justify-between">
              <span>14:22:01</span>
              <span>14:22:04</span>
              <span>14:22:07</span>
              <span>14:22:10</span>
              <span>14:22:13</span>
              <span>now</span>
            </div>
            <span
              className="absolute rounded-[3px]"
              style={{ left: 2, top: 30, width: 160, height: 12, backgroundColor: theme.traceGreen }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 170, top: 30, width: 120, height: 12, backgroundColor: theme.traceBlue }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 350, top: 50, width: 100, height: 12, backgroundColor: theme.traceOrange }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 50, top: 70, width: 130, height: 12, backgroundColor: theme.traceGreen }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 400, top: 90, width: 90, height: 12, backgroundColor: theme.traceBlue }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 30, top: 110, width: 14, height: 10, backgroundColor: theme.traceGreen }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 192, top: 110, width: 14, height: 10, backgroundColor: theme.traceGreen }}
            />
            <span
              className="absolute rounded-[3px]"
              style={{ left: 360, top: 110, width: 14, height: 10, backgroundColor: theme.traceOrange }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
