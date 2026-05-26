import type { AgentWorkspaceRun, RunGroup, WorkspaceTab } from "./types";

export const WORKSPACE_TABS: WorkspaceTab[] = ["overview", "guardrails", "evidence", "trace", "memory", "ops"];

export const WORKSPACE_TAB_LABELS: Record<WorkspaceTab, string> = {
  overview: "Overview",
  guardrails: "Guardrails",
  evidence: "Evidence",
  trace: "Trace",
  memory: "Memory",
  ops: "Ops",
};

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
  id: "A-2026-0526",
  title: "Q3 Revenue Risk · Guardrail + Evidence Review",
  runDisplayId: "run_prod_use1_8f2c14a",
  agentName: "finance_risk_orchestrator",
  agentPath: "planner_agent → finance_sql_agent → validator_agent → narrator_agent",
  environment: "PROD · us-east-1",
  scope: "finance_ro + slack_post_limited",
  tenant: "acme-enterprise",
  startedAt: "14:22:01",
  initiatedBy: "priya.menon@acme-enterprise.com",
  status: "RUNNING",
  currentStep: 5,
  totalSteps: 7,
  stages: [
    { id: "stage-intake", label: "Intake", status: "DONE" },
    { id: "stage-plan", label: "Plan", status: "DONE" },
    { id: "stage-retrieve", label: "Retrieve", status: "DONE" },
    { id: "stage-reason", label: "Reason", status: "DONE" },
    { id: "stage-guardrails", label: "Guardrails", status: "ACTIVE" },
    { id: "stage-respond", label: "Respond", status: "PENDING" },
    { id: "stage-approval", label: "Approval", status: "PENDING" },
  ],
  plan: [
    { id: "plan-1", index: 1, label: "Profile request scope and required finance dimensions", status: "DONE" },
    { id: "plan-2", index: 2, label: "Run warehouse query for Q2/Q3 revenue by product line", status: "DONE" },
    { id: "plan-3", index: 3, label: "Apply account exclusions and anomaly caps", status: "DONE" },
    { id: "plan-4", index: 4, label: "Generate draft risk narrative", status: "DONE" },
    { id: "plan-5", index: 5, label: "Evaluate tone/grounding guardrails", status: "ACTIVE" },
    { id: "plan-6", index: 6, label: "Next checkpoint: human approval for external Slack post", status: "PENDING" },
    { id: "plan-7", index: 7, label: "Finalize and publish run summary", status: "PENDING" },
  ],
  toolChoices: [
    { id: "tool-1", name: "snowflake.run_sql", reason: "Authoritative + fresh financial source", score: 0.97, selected: true },
    { id: "tool-2", name: "dbt.docs_lookup", reason: "Column lineage and model semantics", score: 0.74, selected: false },
    { id: "tool-3", name: "slack.post_message", reason: "Blocked until approval checkpoint", score: 0.63, selected: false },
  ],
  metrics: { p95Ms: 438, tokenCount: 4821, costUsd: 0.093, eventCount: 128, retryCount: 4, spikeCount: 2, budgetUsedLabel: "$0.093 / $1.000" },
  approval: {
    id: "approval_slack_exec_brief",
    pendingCount: 1,
    title: "Approval — post exec brief to #finance-leadership",
    description: "External message channel requires human confirmation.",
    recommendedAction: "review",
  },
  uncertainty: {
    level: "medium",
    confidence: 0.88,
    reasons: ["tone.formal below policy threshold", "two late-arriving rows changed top-line by +0.3%"],
  },
  evidence: {
    warehouse: "finance_curated",
    source: "revenue_by_product_line_v2",
    freshness: "2m 11s",
    rowsScanned: "48,231",
    queryHash: "sql_b61e2c9f",
  },
  guardrails: { passed: 13, total: 14, status: "warning" },
  trace: {
    activeTab: "timeline",
    tabs: ["timeline", "raw", "guardrails", "retries"],
    axisLabels: ["14:22:01", "14:22:10", "14:22:20", "14:22:30", "14:22:40", "now"],
    lanes: [
      { id: "lane-planner", label: "planner_agent" },
      { id: "lane-finance", label: "finance_sql_agent" },
      { id: "lane-validator", label: "validator_agent" },
      { id: "lane-slack", label: "tool · slack.post_message" },
      { id: "lane-guardrails", label: "guardrails" },
    ],
    segments: [
      { id: "seg-1", left: 8, top: 30, width: 140, height: 12, tone: "green" },
      { id: "seg-2", left: 158, top: 50, width: 170, height: 12, tone: "blue" },
      { id: "seg-3", left: 340, top: 70, width: 120, height: 12, tone: "orange" },
      { id: "seg-4", left: 70, top: 90, width: 80, height: 12, tone: "red" },
      { id: "seg-5", left: 430, top: 110, width: 85, height: 12, tone: "green" },
    ],
  },
  events: [
    { id: "event-1", actor: "user", timestamp: "14:22:01", summary: "Assess Q3 revenue risk by product line and draft leadership brief." },
    { id: "event-2", actor: "assistant", timestamp: "14:22:07", summary: "✓ plan.compiled · 7 steps with approval checkpoint" },
    { id: "event-3", actor: "tool", timestamp: "14:22:19", summary: "snowflake.run_sql completed (48,231 rows scanned)" },
  ],
  guardrailChecks: [
    { id: "check-groundedness", name: "answer.groundedness", status: "pass", detail: "0.94 >= 0.85" },
    { id: "check-pii", name: "pii.redaction", status: "pass", detail: "No sensitive identifiers in output" },
    { id: "check-tone", name: "tone.formal", status: "warning", detail: "0.77 below 0.80" },
    { id: "check-action", name: "actionability", status: "pass", detail: "3 actionable recommendations found" },
  ],
  guardrailEvents: [
    { id: "grev-1", timestamp: "14:22:24", checkId: "check-tone", status: "warning", message: "Informal phrase flagged in paragraph 2" },
    { id: "grev-2", timestamp: "14:22:27", checkId: "check-groundedness", status: "pass", message: "All claims linked to cited evidence" },
  ],
  evidenceSources: [
    { id: "evsrc-1", name: "finance_curated.revenue_by_product_line_v2", type: "table", freshness: "2m 11s", confidence: 0.98, freshnessScore: 96 },
    { id: "evsrc-2", name: "q3_risk_delta_query", type: "query", freshness: "2m 09s", confidence: 0.94, freshnessScore: 94 },
    { id: "evsrc-3", name: "pricing_policy_2026_q2", type: "document", freshness: "1d", confidence: 0.87, freshnessScore: 62 },
    { id: "evsrc-4", name: "exchange-rate-service", type: "api", freshness: "5m", confidence: 0.92, freshnessScore: 90 },
  ],
  traceEvents: [
    { id: "tev-1", timestamp: "14:22:06", laneId: "lane-planner", level: "info", message: "Execution plan finalized" },
    { id: "tev-2", timestamp: "14:22:19", laneId: "lane-finance", level: "info", message: "Warehouse query succeeded" },
    { id: "tev-3", timestamp: "14:22:23", laneId: "lane-validator", level: "warning", message: "Tone drift detected; soft rewrite triggered" },
    { id: "tev-4", timestamp: "14:22:31", laneId: "lane-slack", level: "error", message: "Post blocked awaiting approval checkpoint" },
  ],
  memoryLedger: [
    { id: "mem-1", scope: "session", key: "preferred_tone", value: "formal, concise", updatedAt: "14:22:03" },
    { id: "mem-2", scope: "run", key: "target_channel", value: "#finance-leadership", updatedAt: "14:22:05" },
    { id: "mem-3", scope: "agent", key: "last_successful_template", value: "leadership_brief_v5", updatedAt: "14:22:26" },
  ],
  opsEvalMetrics: [
    { id: "ops-1", name: "groundedness", score: 0.94, threshold: 0.85, status: "pass" },
    { id: "ops-2", name: "tone.formal", score: 0.77, threshold: 0.8, status: "warning" },
    { id: "ops-3", name: "latency.p95_budget", score: 0.84, threshold: 0.8, status: "pass" },
    { id: "ops-4", name: "approval.readiness", score: 0.62, threshold: 0.75, status: "warning" },
  ],
  latencySamples: [
    { timestamp: "14:22:08", p50Ms: 210, p95Ms: 370 },
    { timestamp: "14:22:16", p50Ms: 225, p95Ms: 402 },
    { timestamp: "14:22:24", p50Ms: 248, p95Ms: 438 },
    { timestamp: "14:22:32", p50Ms: 232, p95Ms: 415 },
  ],
};
