import { useMemo, useState } from "react";
import type { AgentWorkspaceRun } from "../types";
import { WORKSPACE_UI } from "../ui";

export function RunSidebar({ run }: { run: AgentWorkspaceRun }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Pending" | "Failed"
  >("All");

  // TODO: connect to real run history/pinned data.
  const MOCK_RUNS = {
    PINNED: [
      { id: "run-001", title: "Customer support triage", status: "Active" },
      { id: "run-002", title: "Q2 forecasting cleanup", status: "Pending" },
    ],
    TODAY: [
      { id: "run-003", title: "RAG ingestion health check", status: "Failed" },
      { id: "run-004", title: "Security policy draft", status: "Active" },
    ],
    EARLIER: [
      { id: "run-005", title: "Data quality sweep", status: "Pending" },
      { id: "run-006", title: "Meeting transcript summary", status: "Failed" },
    ],
  } as const;

  const filters = ["All", "Active", "Pending", "Failed"] as const;
  const currentRunId = run.id;

  const groupedRuns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return Object.entries(MOCK_RUNS).map(([group, items]) => {
      const filtered = items.filter((item) => {
        const matchesFilter =
          activeFilter === "All" || item.status === activeFilter;
        const matchesSearch =
          query.length === 0 || item.title.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
      });

      return { group, items: filtered };
    });
  }, [search, activeFilter]);

  return (
    <aside
      className={`hidden h-full min-h-0 flex-col border-r border-white/10 ${WORKSPACE_UI.panelBg} p-[14px] md:flex md:w-[240px] lg:w-[272px]`}
    >
      <button
        className="mb-3 w-full rounded-[12px] border border-slate-700 bg-slate-800 px-3 py-2 text-left text-sm font-medium text-slate-100 transition hover:bg-slate-700"
        type="button"
      >
        New run
      </button>
      <input
        className="mb-3 w-full rounded-[12px] border border-slate-700 bg-[#0a1220] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search runs, agents..."
        value={search}
      />
      <div className="mb-4 grid grid-cols-2 gap-2">
        {filters.map((filter) => (
          <button
            className={`rounded-md border px-2 py-1 text-xs ${
              activeFilter === filter
                ? "border-slate-500 bg-slate-700 text-slate-100"
                : "border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800"
            }`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        {groupedRuns.map(({ group, items }) => (
          <section key={group}>
            <h3 className="mb-2 text-xs font-semibold tracking-wide text-slate-400">
              {group}
            </h3>
            <ul className="space-y-2">
              {items.length ? (
                items.map((item) => (
                  <li
                    className={`rounded-md border px-3 py-2 ${
                      item.id === currentRunId
                        ? "border-slate-500 bg-slate-800"
                        : "border-slate-800 bg-[#0a1220]"
                    }`}
                    key={item.id}
                  >
                    <p className="text-sm text-slate-100">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.status}</p>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-500">No runs</li>
              )}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="text-sm text-slate-100">priya@acme</p>
        <p className="text-xs text-slate-400">analyst</p>
      </div>
    </aside>
  );
}
