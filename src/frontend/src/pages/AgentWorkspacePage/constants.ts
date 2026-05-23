import type { ConversationMessage, RunStage, ToolChoice } from "./types";

export const RUN_STAGES: RunStage[] = [
  { id: "brief", label: "Requirement Review", status: "done" },
  { id: "plan", label: "Execution Plan", status: "active" },
  { id: "verify", label: "Result Validation", status: "pending" },
];

export const SAMPLE_MESSAGES: ConversationMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Please implement the Agent Workspace page scaffold.",
    timestamp: "09:12",
  },
  {
    id: "m2",
    role: "assistant",
    content: "Started. I will first build the layout and component containers.",
    timestamp: "09:13",
  },
];

export const TOOL_CHOICES: ToolChoice[] = [
  {
    id: "t1",
    name: "Read Files",
    reason: "Locate page routing and the existing layout structure.",
  },
  {
    id: "t2",
    name: "Edit Files",
    reason: "Create the page directory and baseline components.",
  },
];
