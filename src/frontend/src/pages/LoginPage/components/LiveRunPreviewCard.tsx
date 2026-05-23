import { LIVE_RUN_PREVIEW_DATA, type LiveRunPreviewStageState } from "../constants";

const stageClasses: Record<LiveRunPreviewStageState, string> = {
  done: "bg-[#337399] text-[#64748b]",
  active: "bg-[#0ea5e9] text-[#0ea5e9] font-semibold",
  pending: "bg-[#1a2535] text-[#475569]",
};

const eventColor: Record<string, string> = {
  success: "text-[#22c55e]",
  running: "text-[#0ea5e9]",
  warning: "text-[#fbbf24]",
};

const badgeToneClass: Record<string, string> = {
  success: "bg-[#021b0c] text-[#22c55e]",
  warning: "bg-[#301209] text-[#fbbf24]",
  info: "bg-[#0f172a] text-[#0ea5e9]",
};

export function LiveRunPreviewCard(): JSX.Element {
  return (
    <div className="w-full rounded-xl border border-[#1e293b] bg-[#0a1018] px-5 py-4">
      <div className="mb-[14px] flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold text-[#64748b]">LIVE RUN PREVIEW</span>
        <span className="rounded-[4px] bg-[#031d2e] px-2 py-[2px] text-[11px] text-[#0ea5e9]">
          ● {LIVE_RUN_PREVIEW_DATA.status} · {LIVE_RUN_PREVIEW_DATA.elapsed}
        </span>
      </div>
      <div className="mb-[14px] text-[14px] font-semibold text-[#cbd5e1]">
        {LIVE_RUN_PREVIEW_DATA.title} · {LIVE_RUN_PREVIEW_DATA.agent}
      </div>
      <div className="mb-[14px] grid grid-cols-6 gap-2">
        {LIVE_RUN_PREVIEW_DATA.stages?.map((stage) => (
          <div key={stage.label} className="space-y-1">
            <div className={`h-[3px] rounded-sm ${stageClasses[stage.state].split(" ")[0]}`} />
            <p className={`text-[10px] ${stageClasses[stage.state].replace(stageClasses[stage.state].split(" ")[0], "")}`}>
              {stage.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-[14px] space-y-1.5 rounded-[8px] bg-[#070d14] px-[14px] py-3 text-[11px]">
        {LIVE_RUN_PREVIEW_DATA.events?.map((event) => (
          <p key={`${event.time}-${event.text}`} className="text-[#94a3b8]">
            <span className={eventColor[event.status]}>{event.time}</span> {event.text}{" "}
            {event.highlight && <span className="text-[#0ea5e9]">{event.highlight}</span>}
          </p>
        ))}
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        {LIVE_RUN_PREVIEW_DATA.badges?.map((badge) => (
          <span
            key={badge.label}
            className={`rounded-[4px] px-2 py-[2px] text-[10px] ${badgeToneClass[badge.tone]}`}
          >
            {badge.label}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-[#64748b]">
        {LIVE_RUN_PREVIEW_DATA.cost} / {LIVE_RUN_PREVIEW_DATA.tokens}
      </p>
    </div>
  );
}
