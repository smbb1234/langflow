import { TOOL_CHOICES } from "../constants";

export function ToolChoiceCard() {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">
        Tool Selection
      </h2>
      <div className="space-y-2">
        {TOOL_CHOICES.map((tool) => (
          <div className="rounded-[10px] bg-[#1a2537] p-2" key={tool.id}>
            <p className="text-xs font-medium text-slate-100">{tool.name}</p>
            <p className="text-[11px] text-slate-400">{tool.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
