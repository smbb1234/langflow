import { WORKSPACE_TABS } from "../constants";
import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";
import { TraceConsoleBar } from "./TraceConsoleBar";
import { WorkspacePromptInput } from "./WorkspacePromptInput";

export function RunMainPanel({ run, theme }: { run: AgentWorkspaceRun; theme: WorkspaceTheme }) {
  const chip = { backgroundColor: theme.pillBg, border: `1px solid ${theme.pillBorder}`, color: theme.textSecondary };
  return <main className="flex min-h-0 min-w-0 flex-1 flex-col" style={{ backgroundColor: theme.pageBg }}>
    <header className="flex h-[60px] items-center justify-between border-b px-4" style={{ borderColor: theme.panelBorder }}><div><h1 className="text-[16px] font-semibold" style={{ color: theme.textPrimary }}>{run.title}</h1><div className="mt-1 flex gap-2 text-[11px]"><span className="rounded px-2 py-0.5" style={chip}>run · {run.runDisplayId}</span><span className="rounded px-2 py-0.5" style={chip}>{run.agentPath}</span></div></div></header>
    <div className="flex h-[40px] items-center gap-5 border-b px-4 text-[12px]" style={{ borderColor: theme.panelBorder }}>{WORKSPACE_TABS.map((tab, i)=><span key={tab} style={{color:i===0?theme.textPrimary:theme.textTertiary,fontWeight:i===0?600:400}}>{tab}</span>)}</div>
    <section className="h-[440px] overflow-y-auto px-4 py-4"><div className="space-y-3">{run.events.map((event)=><article key={event.id} className="rounded-[8px] border p-3" style={{borderColor:theme.panelBorder,backgroundColor:theme.surfaceBase}}><p className="text-[12px]" style={{color:theme.textSecondary}}>{event.actor} · {event.timestamp}</p><p className="mt-1 text-[13px]" style={{color:theme.textPrimary}}>{event.summary}</p></article>)}</div></section>
    <div className="h-[100px]"><WorkspacePromptInput theme={theme} /></div>
    <div className="h-[162px]"><TraceConsoleBar run={run} theme={theme} /></div>
  </main>;
}
