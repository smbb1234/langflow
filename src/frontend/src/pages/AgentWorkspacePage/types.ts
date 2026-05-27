export type RunStatus = "RUNNING" | "PENDING" | "COMPLETED" | "FAILED" | "BLOCKED";

export type RunFilter = "all" | "active" | "pending" | "failed";

export type RunListItem = {
  id: string;
  title: string;
  agentName: string;
  status: RunStatus;
  timeLabel: string;
};

export type RunGroup = {
  label: "PINNED" | "TODAY" | "EARLIER";
  runs: RunListItem[];
};

export type StepStatus = "DONE" | "ACTIVE" | "PENDING" | "BLOCKED";

export type WorkspaceTab = "overview" | "guardrails" | "evidence" | "trace" | "memory" | "ops";

export type TraceTab = "timeline" | "raw" | "guardrails" | "retries";

export type ApprovalAction = "review" | "approve" | "deny";

export type RunStage = {
  id: string;
  label: string;
  status: StepStatus;
};

export type RunPlanStep = {
  id: string;
  index: number;
  label: string;
  status: StepStatus;
};

export type WorkspaceEvent = {
  id: string;
  timestamp: string;
  actor: "user" | "assistant" | "tool";
  summary: string;
};

export type ToolChoice = {
  id: string;
  name: string;
  reason: string;
  score: number;
  selected?: boolean;
};

export type RunMetrics = {
  p95Ms: number;
  tokenCount: number;
  costUsd: number;
  eventCount: number;
  retryCount: number;
  spikeCount: number;
  budgetUsedLabel: string;
};

export type ApprovalState = {
  id: string;
  pendingCount: number;
  title: string;
  description: string;
  recommendedAction: ApprovalAction;
};

export type UncertaintyState = {
  level: "low" | "medium" | "high";
  confidence: number;
  reasons: string[];
};

export type EvidenceState = {
  warehouse: string;
  source: string;
  freshness: string;
  rowsScanned: string;
  queryHash: string;
};

export type GuardrailsState = {
  passed: number;
  total: number;
  status: "pass" | "warning" | "failed";
};

export type TraceSegment = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  tone: "green" | "blue" | "orange" | "red";
};

export type TraceLane = {
  id: string;
  label: string;
};

export type TraceState = {
  activeTab: TraceTab;
  tabs: TraceTab[];
  axisLabels: string[];
  lanes: TraceLane[];
  segments: TraceSegment[];
};



export type GuardrailCheck = {
  id: string;
  name: string;
  status: "pass" | "warn" | "warning" | "failed";
  detail: string;
};

export type GuardrailEvent = {
  id: string;
  timestamp: string;
  checkId: string;
  status: "pass" | "warning" | "failed";
  message: string;
};

export type EvidenceSource = {
  id: string;
  name: string;
  type: "table" | "query" | "document" | "api";
  freshness: string;
  confidence: number;
  freshnessScore: number;
};

export type TraceEvent = {
  id: string;
  timestamp: string;
  laneId: string;
  level: "info" | "warning" | "error";
  message: string;
};

export type MemoryLedgerItem = {
  id: string;
  // scope controls badge color and helps users understand persistence ownership.
  scope: "user" | "session" | "tenant";
  key: string;
  value: string;
  reason: string;
  expiry: string;
};

export type OpsEvalMetric = {
  id: string;
  name: string;
  score: number;
  threshold: number;
  status: "pass" | "warning" | "failed";
};

export type LatencySample = {
  timestamp: string;
  p50Ms: number;
  p95Ms: number;
};

export type GuardrailFeedItem = { id: string; timestamp: string; message: string };
export type EvidenceSummaryMetric = { id: string; label: string; value: string };
export type FreshnessMetric = { id: string; label: string; valueLabel: string; valueHours: number };
export type TraceTimelineItem = {
  id: string;
  tone: "green" | "blue" | "amber";
  time: string;
  title: string;
  detail: string;
};
export type KeyValueItem = { id: string; label: string; value: string; tone?: "default" | "success" | "warning" };
export type OpsSignal = { id: string; label: string; value: string; tone?: "default" | "success" | "warning" };

export type AgentWorkspaceRun = {
  id: string;
  title: string;
  runDisplayId: string;
  agentName: string;
  agentPath: string;
  environment: string;
  scope: string;
  tenant: string;
  startedAt: string;
  initiatedBy: string;
  status: RunStatus;
  currentStep: number;
  totalSteps: number;
  stages: RunStage[];
  plan: RunPlanStep[];
  toolChoices: ToolChoice[];
  mockResult?: {
    headline: string;
    summary: string;
    insight: string;
    comparison: Array<{ id: string; label: string; q2: number; q3: number }>;
  };
  metrics: RunMetrics;
  approval: ApprovalState;
  uncertainty: UncertaintyState;
  evidence: EvidenceState;
  guardrails: GuardrailsState;
  trace: TraceState;
  events: WorkspaceEvent[];
  guardrailChecks: GuardrailCheck[];
  guardrailEvents: GuardrailEvent[];
  evidenceSources: EvidenceSource[];
  traceEvents: TraceEvent[];
  memoryLedger: MemoryLedgerItem[];
  opsEvalMetrics: OpsEvalMetric[];
  latencySamples: LatencySample[];
};
