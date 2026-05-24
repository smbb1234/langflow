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
    { id: "stage-plan", label: "Plan", status: "DONE" },
    { id: "stage-retrieve", label: "Retrieve", status: "DONE" },
    { id: "stage-reason", label: "Reason", status: "DONE" },
    { id: "stage-tool", label: "Tool", status: "ACTIVE" },
    { id: "stage-validate", label: "Validate", status: "PENDING" },
    { id: "stage-respond", label: "Respond", status: "PENDING" },
  ],
  plan: [
    {
      id: "plan-1",
      index: 1,
      label: "Inspect finance warehouse schema",
      status: "DONE",
    },
    {
      id: "plan-2",
      index: 2,
      label: "Query Q2/Q3 revenue by product line",
      status: "DONE",
    },
    {
      id: "plan-3",
      index: 3,
      label: "Exclude internal test accounts",
      status: "DONE",
    },
    {
      id: "plan-4",
      index: 4,
      label: "Flag product lines with >5% drop",
      status: "ACTIVE",
    },
    {
      id: "plan-5",
      index: 5,
      label: "Validate exclusions and evidence",
      status: "PENDING",
    },
    {
      id: "plan-6",
      index: 6,
      label: "Prepare final summary",
      status: "PENDING",
    },
  ],
  toolChoices: [
    {
      id: "tool-1",
      name: "snowflake.run_sql",
      reason: "Authoritative, scoped, fresh < 5min",
      score: 0.94,
      selected: true,
    },
    {
      id: "tool-2",
      name: "bigquery.run_sql",
      reason: "No mirror of finance_curated",
      score: 0.31,
      selected: false,
    },
    {
      id: "tool-3",
      name: "cache.lookup_csv",
      reason: "Snapshot stale > 96h",
      score: 0.18,
      selected: false,
    },
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
    id: "approval_post_to_slack",
    title: "Approval — post_to_slack",
    description: "Waiting for human review before external message is sent.",
    recommendedAction: "review",
  },
  uncertainty: {
    level: "medium",
    confidence: 0.91,
    reasons: ["Potential issue: product taxonomy changed in Q3."],
  },
  evidence: {
    warehouse: "finance_curated",
    source: "revenue_by_product_line",
    freshness: "4m 52s",
    rowsScanned: "1,284",
    queryHash: "sql_93a2...",
  },
  guardrails: {
    passed: 12,
    total: 12,
    status: "pass",
  },
  trace: {
    activeTab: "timeline",
    tabs: ["timeline", "raw", "guardrails", "retries"],
    eventsLabel: "Timeline · Raw events · Guardrails · Retries / latency",
  },
  events: [
    {
      id: "event-1",
      actor: "user",
      timestamp: "14:22:00",
      summary:
        "Break down Q3 revenue by product line vs Q2, exclude internal test accounts, and flag any line that dropped >5%. Use the curated finance warehouse.",
    },
    {
      id: "event-2",
      actor: "assistant",
      timestamp: "14:22:03",
      summary: "✓ plan.compiled · 4 steps · est cost $0.018",
    },
    {
      id: "event-3",
      actor: "tool",
      timestamp: "14:22:05",
      summary: "✓ retrieve.snowflake · 1,284 rows · 412ms",
    },
    {
      id: "event-4",
      actor: "tool",
      timestamp: "14:22:09",
      summary: "→ tool.run_sql · scope: finance_ro",
    },
    {
      id: "event-5",
      actor: "assistant",
      timestamp: "14:22:16",
      summary: "⚠ awaiting validation.pre_action",
    },
  ],
};

export const MOCK_AGENT_WORKSPACE_COPY = {
  stageChips: ["Plan", "Retrieve", "Reason", "Tool", "Validate", "Respond"],
  traceTabs: {
    timeline: "Timeline",
    raw: "Raw events",
    guardrails: "Guardrails",
    retries: "Retries / latency",
  },
  mainTabs: ["Overview", "Guardrails", "Evidence", "Trace"],
  inspectorTabs: ["Overview", "Guardrails", "Evidence", "Trace"],
  unresolvedItems: [
    {
      id: "uncertainty-1",
      level: "warning",
      text: "Potential issue: product taxonomy changed in Q3.",
    },
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
