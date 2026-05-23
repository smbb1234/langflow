import type { ConversationMessage, RunStage, ToolChoice } from "./types";

export const RUN_STAGES: RunStage[] = [
  { id: "brief", label: "需求理解", status: "done" },
  { id: "plan", label: "执行计划", status: "active" },
  { id: "verify", label: "结果验证", status: "pending" },
];

export const SAMPLE_MESSAGES: ConversationMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "请实现 Agent Workspace 页面骨架。",
    timestamp: "09:12",
  },
  {
    id: "m2",
    role: "assistant",
    content: "已开始，先搭建布局与组件容器。",
    timestamp: "09:13",
  },
];

export const TOOL_CHOICES: ToolChoice[] = [
  {
    id: "t1",
    name: "Read Files",
    reason: "定位页面路由与现有布局结构。",
  },
  {
    id: "t2",
    name: "Edit Files",
    reason: "创建页面目录与基础组件。",
  },
];
