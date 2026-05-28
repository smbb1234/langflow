import type { AriaAttributes, CSSProperties, ReactNode } from "react";
import type { WorkspaceTheme } from "../theme";

type PillProps = {
  children: ReactNode;
  theme: WorkspaceTheme;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: AriaAttributes["aria-current"];
};

export function TopBarPill({ children, theme, style, className, ariaLabel, ariaCurrent }: PillProps) {
  return (
    <span
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-[11px] ${className ?? ""}`}
      style={{
        border: `1px solid ${theme.pillBorder}`,
        color: theme.textSecondary,
        backgroundColor: theme.pillBg,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function TopBarDivider({ theme }: { theme: WorkspaceTheme }) {
  return <span className="mx-1 h-5 w-px shrink-0" style={{ backgroundColor: theme.panelBorder }} aria-hidden="true" data-testid="topbar-divider" />;
}

export function StatusDot({ color }: { color: string }) {
  return <span className="mr-1.5 inline-block size-[7px] rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />;
}

export function IconLock({
  theme,
  className = "",
}: {
  theme: WorkspaceTheme;
  className?: string;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-testid="icon-lock"
      className={`mr-1.5 h-3.5 w-3.5 shrink-0 ${className}`}
      style={{ color: theme.textSecondary }}
    >
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M12 15v2" />
    </svg>
  );
}

export function IconStopOutline({ theme }: { theme: WorkspaceTheme }) {
  return <span className="inline-block h-[10px] w-[10px] border" style={{ borderColor: theme.error }} aria-hidden="true" data-testid="icon-stop-outline" />;
}

export function IconButton({ label, onClick, children, theme, style }: { label: string; onClick: () => void; children: ReactNode; theme: WorkspaceTheme; style?: CSSProperties }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-[12px]" style={{ borderColor: theme.pillBorder, backgroundColor: theme.pillBg, color: theme.textSecondary, ...style }}>
      {children}
    </button>
  );
}

export function IconBell({ theme }: { theme: WorkspaceTheme }) {
  return (
    <span className="relative inline-block h-3.5 w-3" style={{ color: theme.textSecondary }} aria-hidden="true">
      <span className="absolute left-0 right-0 top-[1px] h-[8px] rounded-t-full border border-b-0" style={{ borderColor: "currentColor" }} />
      <span className="absolute left-[1px] right-[1px] top-[8px] h-[2px] border-t" style={{ borderColor: "currentColor" }} />
      <span className="absolute left-[4px] top-[11px] h-[2px] w-[2px] rounded-full" style={{ backgroundColor: "currentColor" }} />
    </span>
  );
}

export function IconShield({ theme }: { theme: WorkspaceTheme }) {
  return (
    <span className="relative mr-1.5 inline-block h-3.5 w-3" style={{ color: theme.warning }} aria-hidden="true">
      <span className="absolute left-0 top-0 h-[10px] w-3 rounded-t-[3px] border border-b-0" style={{ borderColor: "currentColor" }} />
      <span className="absolute left-0 top-[6px] h-[7px] w-3 border" style={{ borderColor: "currentColor", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
    </span>
  );
}
