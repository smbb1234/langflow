import { useMemo, useState } from "react";
import { JaiLogo } from "@/components/jai/JaiLogo";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import { MOCK_RUN_GROUPS } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type {
  AgentWorkspaceRun,
  RunFilter,
  RunGroup,
  RunListItem,
  RunStatus,
} from "../types";

type RunSidebarProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
  runGroups?: RunGroup[];
  selectedRunId?: string;
  onSelectRun?: (runId: string) => void;
  onCreateRun?: () => void;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filter: RunFilter) => void;
};

const FILTERS: { label: string; value: RunFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const statusColor = (status: RunStatus, theme: WorkspaceTheme) => {
  switch (status) {
    case "RUNNING":
      return theme.primaryStrong;
    case "PENDING":
    case "BLOCKED":
      return theme.warning;
    case "FAILED":
      return theme.error;
    case "COMPLETED":
    default:
      return theme.success;
  }
};

const shouldIncludeByFilter = (status: RunStatus, filter: RunFilter) => {
  if (filter === "all") return true;
  if (filter === "active") return status === "RUNNING";
  if (filter === "pending") return status === "PENDING" || status === "BLOCKED";
  return status === "FAILED";
};

const DEFAULT_SELECTED_ID = "q3-revenue-analysis";

export function RunSidebar({
  run,
  theme,
  runGroups,
  selectedRunId,
  onSelectRun,
  onCreateRun,
  onSearchChange,
  onFilterChange,
}: RunSidebarProps) {
  void run;
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RunFilter>("all");
  const [internalSelectedRunId, setInternalSelectedRunId] =
    useState(DEFAULT_SELECTED_ID);

  const currentSelectedRunId = selectedRunId ?? internalSelectedRunId;
  const groups = runGroups ?? MOCK_RUN_GROUPS;

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return groups
      .map((group) => {
        const runs = group.runs.filter((item) => {
          const filterMatch = shouldIncludeByFilter(item.status, activeFilter);
          const queryMatch =
            normalizedQuery.length === 0 ||
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.agentName.toLowerCase().includes(normalizedQuery);

          return filterMatch && queryMatch;
        });

        return { ...group, runs };
      })
      .filter((group) => group.runs.length > 0);
  }, [activeFilter, groups, query]);

  const selectRun = (runId: string) => {
    if (onSelectRun) {
      onSelectRun(runId);
      return;
    }

    // TODO: replace local selection fallback once run selection is wired to real run list data.
    setInternalSelectedRunId(runId);
  };

  const createRun = () => {
    if (onCreateRun) {
      onCreateRun();
      return;
    }

    // TODO: replace local create-run placeholder when run creation API is connected.
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);

    if (onSearchChange) {
      onSearchChange(nextQuery);
      return;
    }

    // TODO: replace local search fallback when backend run search is available.
  };

  const updateFilter = (filter: RunFilter) => {
    setActiveFilter(filter);

    if (onFilterChange) {
      onFilterChange(filter);
      return;
    }

    // TODO: replace local filter fallback when backend run filters are available.
  };

  return (
    <aside
      className="hidden h-full w-[288px] flex-col md:flex"
      style={{
        backgroundColor: theme.panelBg,
        borderRight: `1px solid ${theme.panelBorder}`,
      }}
    >
      <div
        className="border-b px-4 py-3"
        style={{ borderColor: theme.panelBorder }}
      >
        <JaiLogo className="h-8 w-[140px]" />
        <p
          className="mt-1 text-[12px] font-medium"
          style={{ color: theme.textSecondary }}
        >
          Agentic Workspace
        </p>
      </div>
      <div className="px-4 pt-3">
        <button
          aria-label="Create new run"
          className="h-11 w-full rounded-[8px] text-[13px] font-semibold"
          onClick={createRun}
          style={{ backgroundColor: theme.primary, color: theme.surface }}
          type="button"
        >
          + New run
        </button>
      </div>
      <div className="px-4 pt-3">
        <div
          className="flex h-[34px] items-center rounded-[8px] border px-2"
          style={{
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.panelBorder,
          }}
        >
          <input
            aria-label="Search runs, agents"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-inherit"
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search runs, agents..."
            style={{ color: theme.textTertiary }}
            type="text"
            value={query}
          />
          <span
            className="ml-2 rounded border px-1.5 py-0.5 text-[10px]"
            style={{ color: theme.textMuted, borderColor: theme.panelBorder }}
          >
            ⌘K
          </span>
        </div>
      </div>
      <div className="px-4 pt-3 text-xs">
        <div
          className="hide-scrollbar overflow-x-auto"
          data-testid="run-sidebar-filters"
          role="tablist"
        >
          <div className="flex flex-nowrap gap-[6px]">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                aria-pressed={activeFilter === filter.value}
                className="h-[30px] shrink-0 rounded px-2.5 text-[12px]"
                onClick={() => updateFilter(filter.value)}
                style={{
                  backgroundColor:
                    activeFilter === filter.value
                      ? theme.activePanelBg
                      : "transparent",
                  border: `1px solid ${activeFilter === filter.value ? theme.activePanelBorder : "transparent"}`,
                  color:
                    activeFilter === filter.value
                      ? theme.textPrimary
                      : theme.textTertiary,
                }}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
        {filteredGroups.map((group) => (
          <section key={group.label} className="mb-5">
            <h3
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: theme.textSecondary }}
            >
              {group.label}
            </h3>
            <ul className="space-y-1.5">
              {group.runs.map((item: RunListItem) => {
                const selected = currentSelectedRunId === item.id;

                return (
                  <li key={item.id}>
                    <button
                      className="flex w-full items-start gap-2 rounded-[8px] border px-2 py-2 text-left"
                      aria-current={selected ? "true" : undefined}
                      onClick={() => selectRun(item.id)}
                      style={{
                        backgroundColor: selected
                          ? theme.activePanelBg
                          : "transparent",
                        borderColor: selected
                          ? theme.activePanelBorder
                          : "transparent",
                      }}
                      type="button"
                    >
                      <span
                        className="mt-[4px] h-[7px] w-[7px] shrink-0 rounded-full"
                        style={{
                          backgroundColor: statusColor(item.status, theme),
                        }}
                      />
                      <span className="min-w-0">
                        <span
                          className="block truncate text-[13px] font-semibold"
                          style={{ color: theme.textPrimary }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="block truncate text-[11px]"
                          style={{ color: theme.textSecondary }}
                        >
                          {item.agentName} · {item.timeLabel}
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
      <div
        className="flex h-[56px] items-center gap-2 border-t px-4"
        style={{ borderColor: theme.panelBorder }}
      >
        <CustomProfileIcon className="h-8 w-8 rounded-full object-cover" />
        <div>
          <p
            className="text-[12px] font-semibold"
            style={{ color: theme.textPrimary }}
          >
            Priya Menon
          </p>
          <p className="text-[11px]" style={{ color: theme.textSecondary }}>
            acme · analyst
          </p>
        </div>
        <span
          className="ml-auto text-lg leading-none"
          style={{ color: theme.textTertiary }}
        >
          ···
        </span>
      </div>
    </aside>
  );
}
