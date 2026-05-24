import { loginDarkTheme } from "../theme";
import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import { FeatureChipGroup } from "./FeatureChipGroup";
import { LiveRunPreviewCard } from "./LiveRunPreviewCard";

type LoginBrandPanelProps = {
  onContactSupport?: () => void;
};

export function LoginBrandPanel({
  onContactSupport,
}: LoginBrandPanelProps): JSX.Element {
  return (
    <div className="relative h-full w-full shrink-0 overflow-hidden p-[2px] lg:w-[820px] lg:flex lg:flex-col lg:gap-[2px]" style={{ backgroundColor: loginDarkTheme.pageBackgroundAlt }}>
      <div className="relative z-10 flex h-full flex-col gap-[2px]">
        <div className="flex w-full items-center justify-between px-12 py-6 max-lg:px-6">
          <div>
            <LangflowLogo
              title="Langflow logo"
              className="h-[32px] w-[40px]" style={{ color: loginDarkTheme.accent }}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px]" style={{ color: loginDarkTheme.textMuted }}>Need help?</span>
            <button
              type="button"
              onClick={() => onContactSupport?.()}
              className="rounded-[6px] border px-4 py-2 text-[13px] font-medium" style={{ borderColor: loginDarkTheme.borderStrong, color: loginDarkTheme.textSecondary }}
            >
              Contact support
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-12 pb-8 pt-12 max-lg:px-6">
          <h1 className="text-[36px] font-bold leading-tight tracking-[-0.02em] lg:text-[48px]" style={{ color: loginDarkTheme.textPrimary }}>
            <span>Agents you can </span>
            <span className="" style={{ color: loginDarkTheme.titleAccent }}>watch</span>
            <span>,</span>
            <br />
            <span>controls you can </span>
            <span className="inline-flex flex-col">
              <span>trust.</span>
              <span className="mt-[2px] h-[3px] w-[129px]" style={{ backgroundColor: loginDarkTheme.titleAccent }} />
            </span>
          </h1>
          <p className="max-w-[580px] text-[15px] leading-6" style={{ color: loginDarkTheme.textMuted }}>
            A unified workspace for multi-agent runs — with live execution
            stages, guardrail telemetry, evidence provenance, and full audit
            replay.
          </p>
        </div>

        <div className="w-full px-12 py-[2px] max-lg:px-6">
          <LiveRunPreviewCard />
        </div>

        <div className="flex-1" />
        <FeatureChipGroup />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-full" style={{ background: loginDarkTheme.brandGradient }} />
    </div>
  );
}
