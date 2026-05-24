import type { AgentWorkspaceRun } from "../types";

export function UncertaintyCard({ run }: { run: AgentWorkspaceRun }) {
  const confidenceValue = run.uncertainty.confidence.toFixed(2);
  const bars = [0.25, 0.45, 0.68, 0.91];

  return (
    <section className="rounded-[14px] border border-indigo-300/30 bg-indigo-400/10 p-3">
      <h2 className="mb-1 text-sm font-medium text-indigo-200">Uncertainty</h2>
      <p className="text-xs text-indigo-100/90">
        {run.uncertainty.reasons.join(" ")}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-3xl font-semibold leading-none text-indigo-50">
            {confidenceValue}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-indigo-200">
            answer confidence
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-indigo-200">
            risk {run.uncertainty.level}
          </p>
        </div>
        <div className="flex items-end gap-1" aria-label="confidence bars">
          {bars.map((bar) => (
            <span
              className="w-2 rounded-sm bg-indigo-200/90"
              key={bar}
              style={{
                height: `${Math.round(bar * 28)}px`,
                opacity: bar <= run.uncertainty.confidence ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
