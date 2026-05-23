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
    { id: "t1", name: "warehouse_query", reason: "Best for validated financial joins", score: 0.96 },
    { id: "t2", name: "spreadsheet_math", reason: "Fast hypothesis validation", score: 0.83 },
    { id: "t3", name: "web_search", reason: "External benchmark cross-check", score: 0.41 },
  ],
  metrics: {
    p95Ms: 1280,
    tokenCount: 8241,
    costUsd: 0.37,
    eventCount: 42,
    retryCount: 1,
    budgetUsedPct: 64,
  },
  approval: {
    id: "approval-1",
    title: "Pending Approval",
    description: "Approve execution against the production finance warehouse.",
    recommendedAction: "approve",
  },
  uncertainty: {
    id: "uncertainty-1",
    summary: "Confidence reduced due to incomplete Q3 refunds tagging in one region.",
    confidence: 0.78,
  },
  evidence: [
    { id: "e1", source: "monthly_revenue_fact", detail: "2025-Q3 gross revenue +14.2% YoY." },
    { id: "e2", source: "refunds_adjustment_view", detail: "Region APAC has 3.1% missing refund labels." },
  ],
  guardrails: [
    { id: "g1", passed: true, summary: "PII access policy check passed." },
    { id: "g2", passed: true, summary: "SQL row-limit guardrail passed." },
  ],
  trace: {
    activeTab: "events",
    tabs: ["events", "console", "metrics", "evidence"],
    eventsLabel: "Trace Console · 42 events",
  },
  events: [
    { id: "m1", actor: "user", timestamp: "09:12", summary: "Analyze Q3 revenue changes by segment." },
    { id: "m2", actor: "assistant", timestamp: "09:14", summary: "Building query plan and selecting tools." },
    { id: "m3", actor: "tool", timestamp: "09:16", summary: "warehouse_query executed with filtered cohort." },
  ],
};

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
