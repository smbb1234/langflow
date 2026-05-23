export function WorkspacePromptInput() {
  return (
    <div className="border-t border-white/10 px-4 py-3 lg:px-6">
      <div className="flex items-center gap-2 rounded-[14px] border border-white/10 bg-[#111b2b] p-2">
        <input
          className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="Continue describing your goal or add constraints..."
          type="text"
        />
        <button className="rounded-[10px] bg-sky-500 px-3 py-2 text-xs font-medium text-white">
          Send
        </button>
      </div>
    </div>
  );
}
