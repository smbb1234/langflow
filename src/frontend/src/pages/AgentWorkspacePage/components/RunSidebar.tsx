import { useState } from "react";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

type RunTone = "default" | "success" | "warning" | "active";

type RunItem = {
  id: string;
  title: string;
  subtitle: string;
  tone: RunTone;
};

const RUN_GROUPS: Record<"PINNED" | "TODAY" | "EARLIER", RunItem[]> = {
  PINNED: [
    {
      id: "annualized-churn-drivers",
      title: "Annualized churn drivers",
      subtitle: "analytics_agent · now",
      tone: "active",
    },
    {
      id: "q3-revenue-analysis",
      title: "Q3 revenue analysis",
      subtitle: "finance_sql_agent · 2m",
      tone: "success",
    },
  ],
  TODAY: [
    {
      id: "vendor-invoice-triage",
      title: "Vendor invoice triage",
      subtitle: "ap_agent · 14m",
      tone: "default",
    },
    {
      id: "customer-escalation-4821",
      title: "Customer escalation #4821",
      subtitle: "support_router · 23m",
      tone: "warning",
    },
    {
      id: "weekly-kpi-digest",
      title: "Weekly KPI digest",
      subtitle: "reporting_agent · 1h",
      tone: "default",
    },
    {
      id: "compliance-scan-eu-dsa",
      title: "Compliance scan · EU-DSA",
      subtitle: "policy_agent · 3h",
      tone: "success",
    },
  ],
  EARLIER: [
    {
      id: "pricing-test-plan",
      title: "Pricing test plan",
      subtitle: "growth_agent · yest",
      tone: "default",
    },
    {
      id: "onboarding-draft-v3",
      title: "Onboarding draft v3",
      subtitle: "content_agent · yest",
      tone: "default",
    },
  ],
} as const;

export function RunSidebar({ theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRunId, setSelectedRunId] = useState("annualized-churn-drivers");

  const toneColorMap: Record<RunTone, string> = {
    default: theme.textTertiary,
    success: theme.success,
    warning: theme.warning,
    active: theme.primaryStrong,
  };

  return (
    <aside className="hidden h-full w-[265px] flex-col md:flex" style={{ backgroundColor: theme.panelBg, borderRight: `1px solid ${theme.panelBorder}` }}>
      <div className="px-3 pt-3">
        <p className="text-[15px] font-bold" style={{ color: theme.textPrimary }}>
          JAI
        </p>
        <p className="text-[8px] tracking-[1.3px]" style={{ color: theme.textMuted }}>
          BY DIAGONAL MATRIX
        </p>
      </div>
      <div className="px-3 pt-3">
        <button className="h-[41px] w-full rounded-[8px] text-sm font-semibold" style={{ backgroundColor: theme.primary, color: "#fff" }} type="button">
          + New run
        </button>
      </div>
      <div className="px-3 pt-2">
        <div className="flex h-[34px] items-center rounded-[8px] border px-2" style={{ backgroundColor: theme.surfaceMuted, borderColor: theme.panelBorder }}>
          <input
            aria-label="Search runs, agents"
            className="w-full bg-transparent text-xs outline-none placeholder:text-inherit"
            placeholder="Search runs, agents..."
            style={{ color: theme.textTertiary }}
            type="text"
          />
          <span className="ml-2 text-xs" style={{ color: theme.textMuted }}>
            ⌘K
          </span>
        </div>
      </div>
      <div className="px-3 pt-2 text-xs">
        <div className="flex flex-wrap gap-[4px]">
          {["All", "Active", "Pending", "Failed"].map((filter) => (
            <button
              key={filter}
              className="h-[28px] rounded px-2"
              onClick={() => setActiveFilter(filter)}
              style={{
                backgroundColor: activeFilter === filter ? theme.surfaceBlue : "transparent",
                color: activeFilter === filter ? theme.primaryStrong : theme.textTertiary,
              }}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3">
        {Object.entries(RUN_GROUPS).map(([section, items]) => (
          <section key={section} className="mb-4">
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: theme.textMuted }}>
              {section}
            </h3>
            <ul className="space-y-1">
              {items.map((item) => {
                const selected = selectedRunId === item.id;

                return (
                  <li key={item.id}>
                    <button
                      className="flex w-full items-start gap-2 rounded-[8px] border px-2 py-2 text-left"
                      onClick={() => setSelectedRunId(item.id)}
                      onMouseEnter={(event) => {
                        if (!selected) {
                          event.currentTarget.style.backgroundColor = theme.surfaceMuted;
                        }
                      }}
                      onMouseLeave={(event) => {
                        if (!selected) {
                          event.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                      style={{
                        backgroundColor: selected ? theme.surfaceBlue : "transparent",
                        borderColor: selected ? theme.surfaceBlueBorder : "transparent",
                      }}
                      type="button"
                    >
                      <span className="mt-[4px] h-[7px] w-[7px] shrink-0 rounded-full" style={{ backgroundColor: toneColorMap[item.tone] }} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold" style={{ color: theme.textPrimary }}>
                          {item.title}
                        </span>
                        <span className="block truncate text-[11px]" style={{ color: theme.textMuted }}>
                          {item.subtitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <div className="flex h-[56px] items-center gap-2 border-t px-3" style={{ borderColor: theme.panelBorder }}>
        <CustomProfileIcon className="h-8 w-8 rounded-full object-cover" />
        <div>
          <p className="text-[12px] font-semibold" style={{ color: theme.textPrimary }}>
            Priya Menon
          </p>
          <p className="text-[11px]" style={{ color: theme.textMuted }}>
            acme · analyst
          </p>
        </div>
        <span className="ml-auto text-lg leading-none" style={{ color: theme.textTertiary }}>
          ···
        </span>
      </div>
    </aside>
  );
}
