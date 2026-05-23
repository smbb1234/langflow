export function WorkspaceTopBar() {
  return (
    <header className="flex h-[56px] items-center justify-between border-b border-white/10 bg-[#0f1724] px-4 lg:px-6">
      <div>
        <p className="text-xs text-slate-400">Agent Workspace</p>
        <h1 className="text-sm font-semibold text-slate-100 lg:text-base">
          Run #A-2026-0523
        </h1>
      </div>
      <div className="rounded-[10px] border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
        Running
      </div>
    </header>
  );
}
