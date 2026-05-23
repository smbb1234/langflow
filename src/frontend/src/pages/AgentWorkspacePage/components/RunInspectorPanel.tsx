import { ApprovalCard } from "./ApprovalCard";
import { UncertaintyCard } from "./UncertaintyCard";

export function RunInspectorPanel() {
  return (
    <aside className="h-full overflow-y-auto border-l border-white/10 bg-[#0d1522] p-3 lg:w-[320px]">
      <div className="space-y-3">
        <ApprovalCard />
        <UncertaintyCard />
      </div>
    </aside>
  );
}
