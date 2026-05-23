export type RunStage = {
  id: string;
  label: string;
  status: "done" | "active" | "pending";
};

export type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type ToolChoice = {
  id: string;
  name: string;
  reason: string;
};
