import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";
import { StepListCard } from "./StepListCard";
import { ToolChoiceCard } from "./ToolChoiceCard";

type ConversationThreadProps = {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
};

export function ConversationThread({ run, theme }: ConversationThreadProps) {
  const userEvent = run.events.find((event) => event.actor === "user");
  const agentEvent = run.events.find((event) => event.actor === "assistant");

  const maxComparison = Math.max(...(run.mockResult?.comparison.map((item) => Math.max(item.q2, item.q3)) ?? [1]));

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
      <div className="w-full max-w-[760px] space-y-4 self-center" data-testid="conversation-centered-column">
        <article className="flex items-start gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold"
            style={{ backgroundColor: theme.avatarBg, color: theme.surface }}
          >
            PM
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium" style={{ color: theme.textPrimary }}>
                You
              </span>
              <span style={{ color: theme.textTertiary }}>{userEvent?.timestamp ?? run.startedAt}</span>
            </div>
            <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
              {userEvent?.summary ?? "Break down Q3 revenue by product line vs Q2."}
            </p>
          </div>
        </article>

        <article className="flex items-start gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-semibold"
            style={{ backgroundColor: theme.surfaceBlue, color: theme.primaryStrong, border: `1px solid ${theme.surfaceBlueBorder}` }}
          >
            AI
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium" style={{ color: theme.textPrimary }}>
                {run.agentName}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: theme.pillBg, border: `1px solid ${theme.pillBorder}`, color: theme.textSecondary }}
              >
                planning
              </span>
              <span style={{ color: theme.textTertiary }}>{agentEvent?.timestamp ?? "14:22:03"}</span>
            </div>
            <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
              I'll run this in {run.totalSteps} steps and share evidence as I go.
            </p>
            <StepListCard plan={run.plan} theme={theme} />
            <ToolChoiceCard toolChoices={run.toolChoices} theme={theme} />
          </div>
        </article>

        {run.mockResult ? (
          <article className="ml-11 rounded-lg border p-3" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
            <div className="text-xs font-medium" style={{ color: theme.textSecondary }}>
              {run.mockResult.headline}
            </div>
            <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
              {run.mockResult.summary}
            </p>
            <p className="mt-1 text-[13px]" style={{ color: theme.textSecondary }}>
              {run.mockResult.insight}
            </p>
            <div className="mt-3 rounded-md border p-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted }}>
              <div className="mb-2 text-xs font-medium" style={{ color: theme.textSecondary }}>
                Revenue comparison
              </div>
              <div className="space-y-2">
                {run.mockResult.comparison.map((item) => (
                  <div className="space-y-1" key={item.id}>
                    <div className="text-xs" style={{ color: theme.textPrimary }}>{item.label}</div>
                    <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-2 text-[11px]" style={{ color: theme.textSecondary }}>
                      <span>Q2</span>
                      <div className="h-2 rounded" style={{ width: `${(item.q2 / maxComparison) * 100}%`, backgroundColor: theme.traceBlue }} />
                      <span>Q3</span>
                      <div className="h-2 rounded" style={{ width: `${(item.q3 / maxComparison) * 100}%`, backgroundColor: theme.success }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
