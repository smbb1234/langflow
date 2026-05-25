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

export type WorkspaceTab = "overview" | "guardrails" | "evidence" | "trace";

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
  metrics: RunMetrics;
  approval: ApprovalState;
  uncertainty: UncertaintyState;
  evidence: EvidenceState;
  guardrails: GuardrailsState;
  trace: TraceState;
  events: WorkspaceEvent[];
};
