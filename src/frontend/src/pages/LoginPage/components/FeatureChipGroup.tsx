import { FEATURE_CHIPS } from "../constants";

export function FeatureChipGroup(): JSX.Element {
  return (
    <div className="flex w-full flex-col gap-3 px-12 pb-12 pt-[2px] lg:px-12 max-lg:px-6">
      <span className="text-[10px] font-semibold tracking-[0.08em] text-[#64748b]">
        WHAT'S INSIDE
      </span>
      <div className="flex flex-wrap gap-2">
        {FEATURE_CHIPS.map((chip) => (
          <span
            key={chip}
            className="rounded-[6px] border border-[#334155] px-3 py-1.5 text-[11px] text-[#94a3b8]"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
