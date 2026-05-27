import type { WorkspaceTheme } from "../theme";
import type { RunPlanStep } from "../types";

type StepListCardProps = {
  plan: RunPlanStep[];
  theme: WorkspaceTheme;
};

function StepMarker({ status, index, theme }: { status: RunPlanStep["status"]; index: number; theme: WorkspaceTheme }) {
  if (status === "DONE") {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold"
        style={{ backgroundColor: theme.success, color: theme.surface }}
      >
        ✓
      </span>
    );
  }

  const isActive = status === "ACTIVE";
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-semibold"
      style={{
        backgroundColor: isActive ? theme.surfaceBlue : theme.surfaceMuted,
        borderColor: isActive ? theme.surfaceBlueBorder : theme.panelBorder,
        color: isActive ? theme.primaryStrong : theme.textSecondary,
      }}
    >
      {index}
    </span>
  );
}

export function StepListCard({ plan, theme }: StepListCardProps) {
  return (
    <section className="mt-2 rounded-lg border" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}>
      {plan.map((step, idx) => (
        <div
          key={step.id}
          className="flex h-[35px] items-center justify-between px-3 text-[13px]"
          style={{ borderBottom: idx === plan.length - 1 ? "none" : `1px solid ${theme.panelBorder}` }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <StepMarker status={step.status} index={step.index} theme={theme} />
            <span className="min-w-0 truncate" style={{ color: theme.textPrimary }}>
              {step.label}
            </span>
          </div>
          {step.status === "ACTIVE" ? (
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
              style={{ backgroundColor: theme.surfaceBlue, borderColor: theme.surfaceBlueBorder, color: theme.primaryStrong }}
            >
              RUNNING
            </span>
          ) : null}
        </div>
      ))}
    </section>
  );
}
