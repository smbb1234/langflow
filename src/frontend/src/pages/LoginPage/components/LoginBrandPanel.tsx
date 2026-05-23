import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import { FeatureChipGroup } from "./FeatureChipGroup";
import { LiveRunPreviewCard } from "./LiveRunPreviewCard";

type LoginBrandPanelProps = {
  onContactSupport?: () => void;
};

export function LoginBrandPanel({ onContactSupport }: LoginBrandPanelProps): JSX.Element {
  return (
    <div className="relative h-full w-full shrink-0 overflow-hidden bg-[#070d14] p-[2px] lg:w-[820px] lg:flex lg:flex-col lg:gap-[2px]">
      <div className="relative z-10 flex h-full flex-col gap-[2px]">
        <div className="flex w-full items-center justify-between px-12 py-6 max-lg:px-6">
          <LangflowLogo title="Langflow logo" className="h-[32px] w-[40px]" />
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#94a3b8]">Need help?</span>
            <button
              type="button"
              onClick={() => onContactSupport?.()}
              className="rounded-[6px] border border-[#475569] px-4 py-2 text-[13px] font-medium text-[#cbd5e1]"
            >
              Contact support
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-12 pb-8 pt-12 max-lg:px-6">
          <h1 className="text-[36px] font-bold leading-tight tracking-[-0.02em] text-[#f1f5f9] lg:text-[48px]">
            <span>Agents you can </span>
            <span className="text-[#0ea5e9]">watch</span>
            <span>,</span>
            <br />
            <span>controls you can </span>
            <span className="inline-flex flex-col">
              <span>trust.</span>
              <span className="mt-[2px] h-[3px] w-[129px] bg-[#0ea5e9]" />
            </span>
          </h1>
          <p className="max-w-[580px] text-[15px] leading-6 text-[#94a3b8]">
            A unified workspace for multi-agent runs — with live execution stages, guardrail telemetry,
            evidence provenance, and full audit replay.
          </p>
        </div>

        <div className="w-full px-12 py-[2px] max-lg:px-6">
          <LiveRunPreviewCard />
        </div>

        <div className="flex-1" />
        <FeatureChipGroup />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-full bg-gradient-to-b from-transparent to-[rgba(79,20,140,0.45)]" />
    </div>
  );
}
