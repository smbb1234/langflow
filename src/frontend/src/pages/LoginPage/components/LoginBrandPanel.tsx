import { JaiLogo } from "@/components/jai/JaiLogo";
import type { LoginTheme } from "../theme";

type LoginBrandPanelProps = {
  theme: LoginTheme;
};

export function LoginBrandPanel({ theme }: LoginBrandPanelProps): JSX.Element {
  return (
    <aside
      className="relative w-full overflow-hidden px-[60px] py-[36px] lg:h-screen lg:w-[870px] lg:min-w-[870px]"
      style={{
        backgroundColor: theme.heroGradientTo,
        backgroundImage: `linear-gradient(180deg, ${theme.heroOverlay}, ${theme.heroOverlay}), url('/jai/login-hero-bg.png')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      <div className="flex h-full flex-col">
        <JaiLogo className="h-[53px] w-[230px]" />

        <div className="mt-[120px] max-w-[680px] max-lg:mt-14">
          <span
            className="inline-flex rounded-full border px-[14px] py-[6px] text-[10px] font-semibold tracking-[0.08em]"
            style={{
              backgroundColor: theme.heroBadgeBg,
              borderColor: theme.heroBadgeBorder,
              color: theme.heroBadgeText,
            }}
          >
            AGENTIC PLATFORM · V3.4 NOW IN GA
          </span>

          <h1
            className="mt-6 text-[56px] font-extrabold leading-[66px] tracking-[-0.02em]"
            style={{ color: theme.heroTitle }}
          >
            <span className="block">The agents do the work.</span>
            <span className="block font-bold italic" style={{ color: theme.heroTitleMuted }}>
              You stay <span style={{ color: theme.heroAccent }}>in control.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[620px] text-[16px] leading-[26px]" style={{ color: theme.heroBody }}>
            A unified workspace for multi-agent runs — with live execution stages,
            guardrail telemetry, evidence provenance, and full audit replay. Built for
            teams who need to ship agents and sleep at night.
          </p>
        </div>

        <div className="mt-auto pt-16">
          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "200+", caption: "enterprise teams" },
              { label: "12.4M", caption: "agent runs" },
              { label: "99.98%", caption: "platform uptime" },
            ].map((item) => (
              <div key={item.caption} className="rounded-[10px] border px-4 py-3" style={{ borderColor: theme.heroBadgeBorder, backgroundColor: theme.heroBadgeBg }}>
                <p className="text-[18px] font-bold leading-none" style={{ color: theme.heroTitle }}>{item.label}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em]" style={{ color: theme.heroTrustedText }}>{item.caption}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-semibold tracking-[0.08em]" style={{ color: theme.heroTrustedLabel }}>
            TRUSTED BY TEAMS AT
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-10 gap-y-2 text-[12px] font-semibold tracking-[0.06em]" style={{ color: theme.heroTrustedText }}>
            <span>NORTHWIND</span>
            <span>acme.co</span>
            <span>HELIX</span>
            <span>contoso</span>
            <span>OMNICORP</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
