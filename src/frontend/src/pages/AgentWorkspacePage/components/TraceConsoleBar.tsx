export function TraceConsoleBar() {
  return (
    <footer className="flex h-[64px] items-center justify-between border-t border-white/10 bg-[#0f1724] px-4 lg:px-6">
      <p className="text-xs text-slate-400">Trace Console · 3 events</p>
      <button className="rounded-[10px] border border-white/20 px-3 py-1 text-xs text-slate-200">
        Open Logs
      </button>
    </footer>
  );
}
