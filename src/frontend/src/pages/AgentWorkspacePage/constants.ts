import type { AgentWorkspaceRun, RunGroup, WorkspaceTab } from "./types";

export const WORKSPACE_TABS: WorkspaceTab[] = ["overview", "guardrails", "evidence", "trace"];

export const MOCK_RUN_GROUPS: RunGroup[] = [
  {
    label: "PINNED",
    runs: [
      {
        id: "q3-revenue-analysis",
        title: "Q3 revenue analysis",
        agentName: "finance_sql_agent",
        status: "RUNNING",
        timeLabel: "2m",
      },
      {
        id: "annualized-churn-drivers",
        title: "Annualized churn drivers",
        agentName: "analytics_agent",
        status: "COMPLETED",
        timeLabel: "now",
      },
    ],
  },
  {
    label: "TODAY",
    runs: [
      {
        id: "vendor-invoice-triage",
        title: "Vendor invoice triage",
        agentName: "ap_agent",
        status: "PENDING",
        timeLabel: "14m",
      },
      {
        id: "customer-escalation-4821",
        title: "Customer escalation #4821",
        agentName: "support_router",
        status: "FAILED",
        timeLabel: "23m",
      },
      {
        id: "weekly-kpi-digest",
        title: "Weekly KPI digest",
        agentName: "reporting_agent",
        status: "BLOCKED",
        timeLabel: "1h",
      },
      {
        id: "compliance-scan-eu-dsa",
        title: "Compliance scan · EU-DSA",
        agentName: "policy_agent",
        status: "RUNNING",
        timeLabel: "3h",
      },
    ],
  },
  {
    label: "EARLIER",
    runs: [
      {
        id: "pricing-test-plan",
        title: "Pricing test plan",
        agentName: "growth_agent",
        status: "COMPLETED",
        timeLabel: "yest",
      },
      {
        id: "onboarding-draft-v3",
        title: "Onboarding draft v3",
        agentName: "content_agent",
        status: "COMPLETED",
        timeLabel: "yest",
      },
    ],
  },
];

export const MOCK_AGENT_WORKSPACE_RUN: AgentWorkspaceRun = {
  id: "A-2026-0523",
  title: "Q3 revenue analysis",
  runDisplayId: "r_8f2c14a",
  agentName: "finance_sql_agent",
  agentPath: "finance_sql_agent → chart_agent",
  environment: "PROD · us-east-1",
  scope: "finance_ro",
  tenant: "acme",
  startedAt: "14:22:01",
  initiatedBy: "priya@acme",
  status: "RUNNING",
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
    { id: "plan-1", index: 1, label: "Inspect finance warehouse schema", status: "DONE" },
    { id: "plan-2", index: 2, label: "Query Q2/Q3 revenue by product line", status: "DONE" },
    { id: "plan-3", index: 3, label: "Exclude internal test accounts", status: "DONE" },
    { id: "plan-4", index: 4, label: "Flag product lines with >5% drop", status: "ACTIVE" },
    { id: "plan-5", index: 5, label: "Validate exclusions and evidence", status: "PENDING" },
    { id: "plan-6", index: 6, label: "Prepare final summary", status: "PENDING" },
  ],
  toolChoices: [
    { id: "tool-1", name: "snowflake.run_sql", reason: "Authoritative, scoped, fresh < 5min", score: 0.94, selected: true },
    { id: "tool-2", name: "bigquery.run_sql", reason: "No mirror of finance_curated", score: 0.31, selected: false },
  ],
  metrics: { p95Ms: 412, tokenCount: 1200, costUsd: 0.014, eventCount: 42, retryCount: 3, spikeCount: 1, budgetUsedLabel: "$0.014 / $1.00" },
  approval: {
    id: "approval_post_to_slack",
    pendingCount: 1,
    title: "Approval — post_to_slack",
    description: "Waiting for human review before external message is sent.",
    recommendedAction: "review",
  },
  uncertainty: {
    level: "medium",
    confidence: 0.91,
    reasons: ["Eval drift — tone.formal below threshold (0.71 / 0.80)"],
  },
  evidence: {
    warehouse: "finance_curated",
    source: "revenue_by_product_line",
    freshness: "4m 52s",
    rowsScanned: "1,284",
    queryHash: "sql_93a2...",
  },
  guardrails: { passed: 12, total: 12, status: "pass" },
  trace: {
    activeTab: "timeline",
    tabs: ["timeline", "raw", "guardrails", "retries"],
    axisLabels: ["14:22:01", "14:22:04", "14:22:07", "14:22:10", "14:22:13", "now"],
    lanes: [
      { id: "lane-finance", label: "finance_sql_agent" },
      { id: "lane-chart", label: "chart_agent" },
      { id: "lane-run-sql", label: "tool · run_sql" },
      { id: "lane-render", label: "tool · render" },
      { id: "lane-guardrails", label: "guardrails" },
    ],
    segments: [
      { id: "seg-1", left: 2, top: 30, width: 160, height: 12, tone: "green" },
      { id: "seg-2", left: 170, top: 30, width: 120, height: 12, tone: "blue" },
      { id: "seg-3", left: 350, top: 50, width: 100, height: 12, tone: "orange" },
      { id: "seg-4", left: 50, top: 70, width: 130, height: 12, tone: "green" },
      { id: "seg-5", left: 400, top: 90, width: 90, height: 12, tone: "blue" },
    ],
  },
  events: [
    { id: "event-1", actor: "user", timestamp: "14:22:01", summary: "Break down Q3 revenue by product line vs Q2." },
    { id: "event-2", actor: "assistant", timestamp: "14:22:03", summary: "✓ plan.compiled · 4 steps" },
  ],
};
