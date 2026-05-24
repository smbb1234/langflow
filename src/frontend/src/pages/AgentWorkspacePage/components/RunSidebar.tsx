import { useState } from "react";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

const RUNS = {
  PINNED: [
    "Annualized churn drivers / analytics_agent · now",
    "Q3 revenue analysis / finance_sql_agent · 2m",
  ],
  TODAY: [
    "Vendor invoice triage / ap_agent · 14m",
    "Customer escalation #4821 / support_router · 23m",
    "Weekly KPI digest / reporting_agent · 1h",
    "Compliance scan · EU-DSA / policy_agent · 3h",
  ],
  EARLIER: [
    "Pricing test plan / growth_agent · yest",
    "Onboarding draft v3 / content_agent · yest",
  ],
} as const;

export function RunSidebar({ theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <aside className="hidden h-full w-[265px] flex-col md:flex" style={{ backgroundColor: theme.panelBg, borderRight: `1px solid ${theme.panelBorder}` }}>
      <div className="px-3 pt-3">
        <p className="text-[15px] font-bold" style={{ color: theme.textPrimary }}>JAI</p>
        <p className="text-[8px] tracking-[1.3px]" style={{ color: theme.textMuted }}>BY DIAGONAL MATRIX</p>
      </div>
      <div className="px-3 pt-3">
        <button className="h-[41px] w-full rounded-[8px] text-sm font-semibold" style={{ backgroundColor: theme.primary, color: "#fff" }} type="button">+ New run</button>
      </div>
      <div className="px-3 pt-2">
        <div className="flex h-[34px] items-center rounded-[8px] px-2 text-xs" style={{ backgroundColor: theme.surfaceMuted, color: theme.textTertiary }}>
          <span>Search runs, agents...</span><span className="ml-auto">⌘K</span>
        </div>
      </div>
      <div className="px-3 pt-2 text-xs">
        {["All","Active","Pending","Failed"].map((f)=><button key={f} type="button" onClick={()=>setActiveFilter(f)} className="mr-2 rounded px-2 py-1" style={{ backgroundColor: activeFilter===f?theme.surfaceBlue:"transparent", color: activeFilter===f?theme.primaryStrong:theme.textTertiary }}>{f}</button>)}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3">
        {Object.entries(RUNS).map(([section, items]) => (
          <section key={section} className="mb-4">
            <h3 className="mb-2 text-[10px] font-semibold tracking-[0.08em]" style={{ color: theme.textMuted }}>{section}</h3>
            <ul className="space-y-2">
              {items.map((text) => <li key={text} className="text-[12px]" style={{ color: theme.textSecondary }}>{text}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <div className="flex h-[56px] items-center gap-2 border-t px-3" style={{ borderColor: theme.panelBorder }}>
        <CustomProfileIcon className="h-8 w-8 rounded-full object-cover" />
        <div>
          <p className="text-[12px] font-semibold" style={{ color: theme.textPrimary }}>Priya Menon</p>
          <p className="text-[11px]" style={{ color: theme.textMuted }}>acme · analyst</p>
        </div>
      </div>
    </aside>
  );
}
