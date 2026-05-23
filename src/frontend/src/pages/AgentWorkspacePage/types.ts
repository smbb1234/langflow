export type RunStatus = "RUNNING" | "PAUSED" | "COMPLETED" | "FAILED";

export type StepStatus = "DONE" | "ACTIVE" | "PENDING" | "BLOCKED";

export type RunListStatus = "RUNNING" | "QUEUED" | "COMPLETED" | "FAILED";

export type TraceTab = "events" | "console" | "metrics" | "evidence";

export type ApprovalAction = "approve" | "reject" | "request_changes";

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
  id: string;
  summary: string;
  confidence: number;
};

export type EvidenceData = {
  id: string;
  source: string;
  detail: string;
};

export type GuardrailSummary = {
  id: string;
  passed: boolean;
  summary: string;
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
  evidence: EvidenceData[];
  guardrails: GuardrailSummary[];
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
