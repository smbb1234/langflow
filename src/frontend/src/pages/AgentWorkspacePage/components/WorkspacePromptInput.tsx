export function WorkspacePromptInput() {
  return (
    <div className="border-t border-white/10 px-4 py-3 lg:px-6">
      <div className="flex items-center gap-2 rounded-[14px] border border-white/10 bg-[#111b2b] p-2">
        <input
          className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="继续描述你的目标或补充约束..."
          type="text"
        />
        <button className="rounded-[10px] bg-sky-500 px-3 py-2 text-xs font-medium text-white">
          发送
        </button>
      </div>
    </div>
  );
}
