export function AgentPlanCard() {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#121b2b] p-3">
      <h2 className="mb-2 text-sm font-medium text-slate-100">执行计划</h2>
      <ul className="space-y-2 text-xs text-slate-300">
        <li>1. 对齐页面结构与状态定义</li>
        <li>2. 组织组件职责与数据流</li>
        <li>3. 输出可扩展骨架</li>
      </ul>
    </section>
  );
}
