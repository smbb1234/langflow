export type LiveRunStageState = "done" | "active" | "pending";

export type LiveRunPreviewStage = {
  label: string;
  state: LiveRunStageState;
};

export type LiveRunPreviewEvent = {
  time: string;
  status: "success" | "running" | "warning";
  text: string;
  highlight?: string;
};

export type LiveRunPreviewBadge = {
  label: string;
  tone: "success" | "warning" | "info";
};

export type LiveRunPreviewData = {
  status?: string;
  elapsed?: string;
  title?: string;
  agent?: string;
  stages?: LiveRunPreviewStage[];
  events?: LiveRunPreviewEvent[];
  badges?: LiveRunPreviewBadge[];
  cost?: string;
  tokens?: string;
};

export const LIVE_RUN_PREVIEW_DATA: LiveRunPreviewData = {
  status: "RUNNING",
  elapsed: "00:00:19",
  title: "Q3 revenue analysis",
  agent: "finance_sql_agent",
  stages: [
    { label: "Plan", state: "done" },
    { label: "Retrieve", state: "done" },
    { label: "Reason", state: "done" },
    { label: "Tool Call", state: "active" },
    { label: "Validate", state: "pending" },
    { label: "Respond", state: "pending" },
  ],
  events: [
    { time: "14:22:03", status: "success", text: "✓ plan.compiled · 4 steps · est cost $0.018" },
    { time: "14:22:05", status: "success", text: "✓ retrieve.snowflake · 1,284 rows · 412ms" },
    { time: "14:22:09", status: "running", text: "→ tool.run_sql · scope:", highlight: "finance_ro" },
    { time: "14:22:16", status: "warning", text: "⚠ awaiting validation.pre_action" },
  ],
  badges: [
    { label: "● Guardrails 12/12 pass", tone: "success" },
    { label: "● 1 approval pending", tone: "warning" },
    { label: "● 2 agents active", tone: "info" },
  ],
  cost: "$0.014",
  tokens: "1.2k tok",
};

export const FEATURE_CHIPS = [
  "Live Execution Stages",
  "Guardrail Event Feed",
  "Evidence & Provenance",
  "Audit Replay",
  "Memory Ledger",
  "Approval Gates",
  "Continuous Evals",
  "Least-Privilege Scopes",
];
