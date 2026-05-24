import type { LoginTheme } from "../theme";
import { LiveRunPreviewCard } from "./LiveRunPreviewCard";

type LoginBrandPanelProps = {
  theme: LoginTheme;
  onContactSupport?: () => void;
};

export function LoginBrandPanel({
  theme,
  onContactSupport,
}: LoginBrandPanelProps): JSX.Element {
  return (
    <div
      className="relative h-full w-full shrink-0 overflow-hidden p-[2px] lg:w-[870px] lg:flex lg:flex-col lg:gap-[2px]"
      style={{ backgroundColor: theme.pageBackgroundAlt }}
    >
      <div className="relative z-10 flex h-full flex-col gap-[2px]">
        <div className="flex w-full items-center justify-between px-[60px] py-[36px] max-lg:px-6 max-lg:py-6">
          <div>
            <p
              className="text-[22px] font-bold uppercase leading-none tracking-[1px]"
              style={{ color: theme.textPrimary }}
            >
              JAI
            </p>
            <p
              className="mt-1 text-[9px] font-medium uppercase tracking-[1.5px]"
              style={{ color: theme.textMuted }}
            >
              BY DIAGONAL MATRIX
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px]" style={{ color: theme.textMuted }}>
              Need help?
            </span>
            <button
              type="button"
              onClick={() => onContactSupport?.()}
              className="rounded-[6px] border px-4 py-2 text-[13px] font-medium"
              style={{ borderColor: theme.borderStrong, color: theme.textSecondary }}
            >
              Contact support
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-[60px] pb-8 pt-8 max-lg:px-6">
          <span
            className="w-fit rounded-[100px] border px-[14px] py-[6px] text-[11px] font-semibold tracking-[0.04em]"
            style={{
              backgroundColor: "rgba(0, 199, 217, 0.08)",
              borderColor: "#00c7d9",
              color: "#00c7d9",
            }}
          >
            AGENTIC PLATFORM · V3.4 NOW IN GA
          </span>

          <h1
            className="text-[56px] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#ffffff" }}
          >
            <span className="block font-extrabold">The agents do the work.</span>
            <span className="block font-bold italic">
              You stay <span style={{ color: theme.titleAccent }}>in control.</span>
            </span>
          </h1>
        </div>

        <div className="w-full px-[60px] py-[2px] max-lg:px-6">
          <LiveRunPreviewCard />
        </div>

        <div className="flex-1" />

        <div className="flex w-full flex-col gap-2 px-[60px] pb-12 pt-[2px] max-lg:px-6">
          <span className="text-[10px] font-semibold tracking-[0.08em] text-[#64748b]">
            TRUSTED BY TEAMS AT
          </span>
          <p className="text-[12px] tracking-[0.08em] text-[#94a3b8]">
            NORTHWIND / acme.co / HELIX / contoso / OMNICORP
          </p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-full"
        style={{ background: theme.brandGradient }}
      />
    </div>
  );
}
