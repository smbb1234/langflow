import type { WorkspaceTheme } from "../theme";
import type { AgentWorkspaceRun } from "../types";

function Row({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: WorkspaceTheme;
}) {
  return (
    <div className="grid grid-cols-[104px_1fr] gap-3">
      <span style={{ color: theme.textTertiary }}>{label}</span>
      <span className="truncate" style={{ color: theme.textPrimary }}>
        {value}
      </span>
    </div>
  );
}

export function CurrentRunSection({
  run,
  theme,
}: {
  run: AgentWorkspaceRun;
  theme: WorkspaceTheme;
}) {
  const activeStage = run.stages.find((stage) => stage.status === "ACTIVE");
  const nextStage = run.stages.find((stage) => stage.status === "PENDING");

  return (
    <section
      className="space-y-3 rounded-md border p-4"
      style={{
        borderColor: theme.panelBorder,
        backgroundColor: theme.surface,
        boxShadow: theme.shadowSoft,
      }}
    >
      <h3
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: theme.textSecondary }}
      >
        Current run
      </h3>
      <div className="space-y-2 text-[12px]">
        <Row label="Run ID" value={run.runDisplayId || "—"} theme={theme} />
        <Row label="Started" value={run.startedAt || "—"} theme={theme} />
        <Row label="Active agent" value={run.agentName || "—"} theme={theme} />
        <Row
          label="Stage"
          value={`${run.currentStep}/${run.totalSteps} · ${activeStage?.label ?? "—"}`}
          theme={theme}
        />
        <Row
          label="Next checkpoint"
          value={nextStage?.label ?? "—"}
          theme={theme}
        />
        <Row
          label="Initiated by"
          value={run.initiatedBy || "—"}
          theme={theme}
        />
      </div>
    </section>
  );
}
