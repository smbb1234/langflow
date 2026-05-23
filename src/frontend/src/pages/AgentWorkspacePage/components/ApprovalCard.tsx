export function ApprovalCard() {
  return (
    <section className="rounded-[14px] border border-amber-300/30 bg-amber-400/10 p-3">
      <h2 className="mb-1 text-sm font-medium text-amber-200">待审批</h2>
      <p className="text-xs text-amber-100/90">
        准备执行变更前，需要确认本次操作范围。
      </p>
    </section>
  );
}
