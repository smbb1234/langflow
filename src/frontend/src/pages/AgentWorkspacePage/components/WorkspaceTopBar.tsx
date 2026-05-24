import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

export function WorkspaceTopBar({
  run,
  theme,
}: {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
}) {
  // TODO: connect to real runtime/token/cost API.
  return (
    <header
      className="flex h-[44px] items-center justify-between border-b px-4 lg:px-6"
      style={{
        borderColor: theme.borderPrimary,
        backgroundColor: theme.panelBackground,
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-slate-300">
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            PROD · us-east-1
          </span>
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            finance_ro
          </span>
          <span className="rounded-md border border-slate-700/80 px-2 py-0.5">
            tenant: acme
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-[11px] text-slate-200">
          <span className="shrink-0 font-semibold tracking-wide text-emerald-300">
            RUNNING
          </span>
          <span className="shrink-0 text-slate-400">∞ 00</span>
          <span className="shrink-0 text-slate-400">⚙ p95 412ms</span>
          <span className="shrink-0 text-slate-400">⚡ tok 1.2k</span>
          <span className="shrink-0 text-slate-400">$ 0.014</span>
        </div>
      </div>

      <div className="ml-3 flex max-w-[320px] flex-wrap items-center justify-end gap-1.5 text-[11px]">
        <button className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200" type="button">Pause</button>
        <button className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200" type="button">Resume</button>
        <button className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200" type="button">Share</button>
        <span className="rounded-md border border-amber-500/70 bg-amber-500/10 px-2 py-0.5 text-amber-300">
          1 approval pending
        </span>
        <span className="rounded-md border border-slate-700/80 px-2 py-0.5 text-slate-200">🔔 3</span>
      </div>
    </header>
  );
}
