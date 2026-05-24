import type { AgentWorkspaceRun, RunListItem } from "./types";

export const MOCK_AGENT_WORKSPACE_RUN: AgentWorkspaceRun = {
  id: "A-2026-0523",
  title: "Q3 revenue analysis",
  agentName: "finance_sql_agent",
  status: "RUNNING",
  mode: "Tool",
  currentStep: 4,
  totalSteps: 6,
  stages: [
    { id: "brief", label: "Requirement Review", status: "DONE" },
    { id: "plan", label: "Execution Plan", status: "DONE" },
    { id: "query", label: "SQL Query Generation", status: "ACTIVE" },
    { id: "qa", label: "Result QA", status: "PENDING" },
    { id: "final", label: "Final Write-up", status: "PENDING" },
  ],
  plan: [
    { id: "p1", index: 1, label: "Validate schema scope", status: "DONE" },
    { id: "p2", index: 2, label: "Draft cohort SQL", status: "DONE" },
    { id: "p3", index: 3, label: "Run comparative query", status: "DONE" },
    { id: "p4", index: 4, label: "Compute growth deltas", status: "ACTIVE" },
    { id: "p5", index: 5, label: "Check anomaly evidence", status: "PENDING" },
    { id: "p6", index: 6, label: "Prepare final summary", status: "PENDING" },
  ],
  toolChoices: [
    { id: "t1", name: "warehouse_query", reason: "Best for validated financial joins", score: 0.96, selected: true },
    { id: "t2", name: "spreadsheet_math", reason: "Fast hypothesis validation", score: 0.83, selected: false },
    { id: "t3", name: "web_search", reason: "External benchmark cross-check", score: 0.41, selected: false },
  ],
  metrics: {
    p95Ms: 412,
    tokenCount: 1200,
    costUsd: 0.014,
    eventCount: 42,
    retryCount: 1,
    budgetUsedPct: 78,
  },
  approval: {
    id: "approval-1",
    title: "Approval required",
    description: "Approve production finance read-only access before final execution.",
    recommendedAction: "approve",
  },
  uncertainty: {
    level: "medium",
    confidence: 0.91,
    reasons: [
      "Minor schema drift detected in APAC refund labels.",
      "Historical benchmark table refreshed 36h ago, outside preferred SLA.",
    ],
  },
  evidence: [
    {
      warehouse: "snowflake_finance_prod",
      source: "monthly_revenue_fact",
      freshness: "2026-05-23T07:40:00Z",
      rowsScanned: 1245032,
      queryHash: "c34ed0a4",
    },
    {
      warehouse: "snowflake_finance_prod",
      source: "refunds_adjustment_view",
      freshness: "2026-05-23T08:15:00Z",
      rowsScanned: 438221,
      queryHash: "f8101a9b",
    },
  ],
  guardrails: [
    { passed: true, total: 8, status: "warning" },
  ],
  trace: {
    activeTab: "timeline",
    tabs: ["timeline", "raw", "guardrails", "retries"],
    eventsLabel: "Trace · 42 events",
  },
  events: [
    { id: "m1", actor: "user", timestamp: "09:12", summary: "Analyze Q3 revenue changes by segment." },
    { id: "m2", actor: "assistant", timestamp: "09:14", summary: "Building query plan and selecting tools." },
    { id: "m3", actor: "tool", timestamp: "09:16", summary: "warehouse_query executed with filtered cohort." },
  ],
};

export const MOCK_AGENT_WORKSPACE_COPY = {
  stageChips: ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Response"],
  traceTabs: {
    timeline: "Timeline",
    raw: "Raw",
    guardrails: "Guardrails",
    retries: "Retries",
  },
  mainTabs: ["Overview", "Guardrails", "Evidence", "Trace"],
  inspectorTabs: ["Overview", "Guardrails", "Evidence", "Trace"],
  unresolvedItems: [
    { id: "guardrail-1", level: "warning", text: "1 of 8 guardrails needs review before completion." },
    { id: "evidence-1", level: "error", text: "APAC refund label coverage below 97% target." },
  ] as const,
} as const;

export const MOCK_RUNS: RunListItem[] = [
  {
    id: "A-2026-0523",
    title: "Q3 revenue analysis",
    agentName: "finance_sql_agent",
    status: "RUNNING",
  },
  {
    id: "A-2026-0521",
    title: "Annual margin reconciliation",
    agentName: "finance_sql_agent",
    status: "COMPLETED",
  },
];
