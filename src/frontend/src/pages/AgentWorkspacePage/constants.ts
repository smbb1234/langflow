import type {
  AgentWorkspaceRun,
  EvidenceSummaryMetric,
  FreshnessMetric,
  GuardrailFeedItem,
  KeyValueItem,
  OpsSignal,
  RunGroup,
  TraceTimelineItem,
  WorkspaceTab,
} from "./types";

export const WORKSPACE_TABS: WorkspaceTab[] = ["overview", "guardrails", "evidence", "trace", "memory", "ops"];

export const MAIN_WORKSPACE_TABS: WorkspaceTab[] = ["overview", "guardrails", "evidence", "trace"];

export const INSPECTOR_VISIBLE_TABS: WorkspaceTab[] = ["overview", "guardrails", "evidence", "trace"];

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
  title: "Q3 revenue analysis",
  runDisplayId: "run · _8f2c14a",
  agentName: "finance_sql_agent",
  agentPath: "finance_sql_agent → chart_agent",
  environment: "PROD · us-east-1",
  scope: "finance_ro",
  tenant: "tenant: acme",
  display: {
    environmentChipText: "PROD · us-east-1",
    scopeChipText: "finance_ro",
    scopeLocked: true,
    tenantChipText: "tenant: acme",
    topBarTitle: "Q3 revenue analysis",
    statusText: "RUNNING",
    progressLetters: ["a", "r", "a", "s", "d", "p"],
    metricsText: {
      step: "step 4/6",
      elapsed: "00:00:14",
      events: "∞ 128",
      p95: "p95 412ms",
      tokens: "tok 1.2k",
      cost: "$ 0.014",
    },
    approvalsText: "1 approval pending",
    unreadNotificationsCount: 3,
    runHeaderChipValues: {
      runId: "run · _8f2c14a",
      path: "finance_sql_agent → chart_agent",
    },
  },
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
  mockResult: {
    headline: "Analyzed result · Q3 versus Q2 by product line",
    summary: "Q3 revenue increased 8.4% overall versus Q2, led by Enterprise and Mid-Market growth.",
    insight: "SMB softened quarter-over-quarter; keep anomaly-capped accounts excluded before sharing externally.",
    comparison: [
      { id: "cmp-ent", label: "Enterprise", q2: 74, q3: 83 },
      { id: "cmp-mm", label: "Mid-Market", q2: 51, q3: 57 },
      { id: "cmp-smb", label: "SMB", q2: 36, q3: 32 },
    ],
  },
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
    { id: "check-1", name: "Prompt injection scan", status: "pass", detail: "0 patterns matched" },
    { id: "check-2", name: "Policy: warehouse_scope", status: "pass", detail: "finance_curated only" },
    { id: "check-3", name: "Pre-action structural check", status: "pass", detail: "SQL parsed, read-only" },
    { id: "check-4", name: "DLP — PII", status: "pass", detail: "no PII in output" },
    { id: "check-5", name: "DLP — secrets", status: "pass", detail: "0 secret regex hits" },
    { id: "check-6", name: "Intent enforcement", status: "pass", detail: "matches user goal (0.94)" },
    { id: "check-7", name: "Output schema validation", status: "warn", detail: "chart_spec missing `unit`" },
    { id: "check-8", name: "Cost ceiling", status: "pass", detail: "$0.014 / $1.00 budget" },
  ],
  guardrailEvents: [
    { id: "grev-1", timestamp: "14:22:24", checkId: "check-tone", status: "warning", message: "Informal phrase flagged in paragraph 2" },
    { id: "grev-2", timestamp: "14:22:27", checkId: "check-groundedness", status: "pass", message: "All claims linked to cited evidence" },
  ],
  evidenceSources: [
    { id: "evsrc-1", name: "finance_curated.revenue_lines", type: "table", freshness: "4m", confidence: 0.98, freshnessScore: 99 },
    { id: "evsrc-2", name: "finance_curated.test_accounts", type: "table", freshness: "1h", confidence: 0.95, freshnessScore: 98 },
    { id: "evsrc-3", name: "policy/qoq_flag_threshold.md", type: "document", freshness: "—", confidence: 1, freshnessScore: 72 },
    { id: "evsrc-4", name: "memory://priya/preferred_currency", type: "api", freshness: "12d", confidence: 0.86, freshnessScore: 64 },
  ],
  traceEvents: [
    { id: "tev-1", timestamp: "14:22:06", laneId: "lane-planner", level: "info", message: "Execution plan finalized" },
    { id: "tev-2", timestamp: "14:22:19", laneId: "lane-finance", level: "info", message: "Warehouse query succeeded" },
    { id: "tev-3", timestamp: "14:22:23", laneId: "lane-validator", level: "warning", message: "Tone drift detected; soft rewrite triggered" },
    { id: "tev-4", timestamp: "14:22:31", laneId: "lane-slack", level: "error", message: "Post blocked awaiting approval checkpoint" },
  ],
  memoryLedger: [
    { id: "mem-1", scope: "user", key: "preferred_currency", value: "USD", reason: "user stated 2026-05-08", expiry: "exp 12m" },
    { id: "mem-2", scope: "user", key: "default_warehouse", value: "curated", reason: "set in onboarding", expiry: "exp —" },
    { id: "mem-3", scope: "session", key: "exclude_test_accounts", value: "true", reason: "this conversation", expiry: "exp session" },
    { id: "mem-4", scope: "session", key: "q3_flagged_lines", value: "", reason: "agent inferred this run", expiry: "exp session" },
    { id: "mem-5", scope: "tenant", key: "slack#finance-review handle", value: "", reason: "approval target", expiry: "exp —" },
  ],
  opsEvalMetrics: [
    { id: "ops-1", name: "answer.faithfulness", score: 0.94, threshold: 0.85, status: "pass" },
    { id: "ops-2", name: "answer.completeness", score: 0.89, threshold: 0.85, status: "pass" },
    { id: "ops-3", name: "tone.formal", score: 0.71, threshold: 0.8, status: "warning" },
    { id: "ops-4", name: "latency_p95", score: 0.96, threshold: 0.9, status: "pass" },
  ],
  latencySamples: [
    { timestamp: "14:22:08", p50Ms: 210, p95Ms: 370 },
    { timestamp: "14:22:16", p50Ms: 225, p95Ms: 402 },
    { timestamp: "14:22:24", p50Ms: 248, p95Ms: 438 },
    { timestamp: "14:22:32", p50Ms: 232, p95Ms: 415 },
  ],
};

export const GUARDRAIL_EVENT_FEED: GuardrailFeedItem[] = [
  { id: "gf-1", timestamp: "14:22:09", message: "dlp.scan output → ok" },
  { id: "gf-2", timestamp: "14:22:08", message: "schema.chart_spec → missing `unit`" },
  { id: "gf-3", timestamp: "14:22:07", message: "policy.warehouse_scope → finance_curated" },
  { id: "gf-4", timestamp: "14:22:05", message: "injection.scan → 0 matches" },
  { id: "gf-5", timestamp: "14:22:03", message: "run.start by priya@acme" },
];

export const EVIDENCE_SUMMARY_METRICS: EvidenceSummaryMetric[] = [
  { id: "es-1", label: "Sources", value: "4" },
  { id: "es-2", label: "Retrieved docs", value: "7" },
  { id: "es-3", label: "Memory items", value: "2" },
  { id: "es-4", label: "Tool outputs", value: "3" },
];

export const EVIDENCE_FRESHNESS: FreshnessMetric[] = [
  { id: "fr-1", label: "revenue_lines", valueLabel: "0.1h", valueHours: 0.1 },
  { id: "fr-2", label: "test_accounts", valueLabel: "1h", valueHours: 1 },
  { id: "fr-3", label: "qoq_threshold", valueLabel: "312.0h", valueHours: 312 },
];

export const TRACE_TIMELINE_ITEMS: TraceTimelineItem[] = [
  { id: "tt-1", tone: "blue", time: "14:21.420", title: "respond.compose", detail: "chart_agent merged" },
  { id: "tt-2", tone: "amber", time: "14:20.912", title: "validate.schema", detail: "chart_spec missing unit" },
  { id: "tt-3", tone: "blue", time: "14:20.810", title: "handoff", detail: "finance_sql_agent → chart_agent" },
  { id: "tt-4", tone: "green", time: "14:20.642", title: "tool.run_sql.complete", detail: "1284 rows · 412ms" },
  { id: "tt-5", tone: "green", time: "14:20.001", title: "policy_check", detail: "scope=finance_curated" },
  { id: "tt-6", tone: "green", time: "14:20.320", title: "plan.compile", detail: "4 steps · est $0.018" },
  { id: "tt-7", tone: "blue", time: "14:21.094", title: "run.start", detail: "by priya@acme" },
];

export const TRACE_HANDOFF_ITEMS: KeyValueItem[] = [
  { id: "hv-1", label: "From", value: "finance_sql_agent" },
  { id: "hv-2", label: "To", value: "chart_agent" },
  { id: "hv-3", label: "Contract", value: "ChartSpecV1" },
  { id: "hv-4", label: "Verified", value: "✓ payload valid", tone: "success" },
];

export const MEMORY_SAFETY_ITEMS: KeyValueItem[] = [
  { id: "ms-1", label: "Writes this run", value: "2" },
  { id: "ms-2", label: "Sensitive PII", value: "none stored", tone: "success" },
  { id: "ms-3", label: "Rollback window", value: "7 days" },
];

export const OPS_SIGNALS: OpsSignal[] = [
  { id: "op-1", label: "Tool retries", value: "0" },
  { id: "op-2", label: "Loop detector", value: "quiet", tone: "success" },
  { id: "op-3", label: "Cost trajectory", value: "+0.01% vs avg", tone: "success" },
  { id: "op-4", label: "Latency spike (5m)", value: "1 outlier (812ms)", tone: "warning" },
];
