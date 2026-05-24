export type RunStatus = "RUNNING" | "PAUSED" | "COMPLETED" | "FAILED";

export type StepStatus = "DONE" | "ACTIVE" | "PENDING" | "BLOCKED";

export type RunListStatus = "RUNNING" | "QUEUED" | "COMPLETED" | "FAILED";

export type TraceTab = "timeline" | "raw" | "guardrails" | "retries";

export type ApprovalAction = "review" | "approve" | "deny";

export type WorkspaceStage = {
  id: string;
  label: string;
  status: StepStatus;
};

export type AgentPlanStep = {
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

export type WorkspaceMetrics = {
  p95Ms: number;
  tokenCount: number;
  costUsd: number;
  eventCount: number;
  retryCount: number;
  budgetUsedPct: number;
};

export type ApprovalData = {
  id: string;
  title: string;
  description: string;
  recommendedAction: ApprovalAction;
};

export type UncertaintyData = {
  level: "low" | "medium" | "high";
  confidence: number;
  reasons: string[];
};

export type EvidenceData = {
  warehouse: string;
  source: string;
  freshness: string;
  rowsScanned: string;
  queryHash: string;
};

export type GuardrailSummary = {
  passed: number;
  total: number;
  status: "pass" | "warning" | "failed";
};

export type TraceConsoleData = {
  activeTab: TraceTab;
  tabs: TraceTab[];
  eventsLabel: string;
};

export type AgentWorkspaceRun = {
  id: string;
  title: string;
  agentName: string;
  status: RunStatus;
  mode: "Tool" | "Chat";
  currentStep: number;
  totalSteps: number;
  stages: WorkspaceStage[];
  plan: AgentPlanStep[];
  toolChoices: ToolChoice[];
  metrics: WorkspaceMetrics;
  approval: ApprovalData;
  uncertainty: UncertaintyData;
  evidence: EvidenceData;
  guardrails: GuardrailSummary;
  trace: TraceConsoleData;
  events: WorkspaceEvent[];
};

export type RunListItem = {
  id: string;
  title: string;
  agentName: string;
  status: RunListStatus;
};

export interface RuntimeApi {
  getRun: (runId: string) => Promise<AgentWorkspaceRun>;
  continueRun: ContinueRunHandler;
}

export interface ToolChoiceProvider {
  listChoices: (runId: string) => Promise<ToolChoice[]>;
}

export interface ObservabilityApi {
  listEvents: (runId: string) => Promise<WorkspaceEvent[]>;
  getMetrics: (runId: string) => Promise<WorkspaceMetrics>;
}

export type ApprovalHandler = (
  runId: string,
  action: ApprovalAction,
) => Promise<void>;

export type ContinueRunHandler = (runId: string, prompt: string) => Promise<void>;
