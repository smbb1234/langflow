import type { CSSProperties, ReactNode } from "react";
import type { WorkspaceTheme } from "../theme";

type PillProps = {
  children: ReactNode;
  theme: WorkspaceTheme;
  style?: CSSProperties;
  className?: string;
};

export function TopBarPill({ children, theme, style, className }: PillProps) {
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-[10px] ${className ?? ""}`}
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

export function StatusDot({ color }: { color: string }) {
  return <span className="mr-1.5 inline-block size-[7px] rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />;
}

export function IconLock({ theme }: { theme: WorkspaceTheme }) {
  // TODO: replace with project icon component if available.
  return (
    <span
      className="relative mr-1.5 inline-block h-3 w-[9px]"
      style={{ color: theme.textSecondary }}
      aria-hidden="true"
    >
      <span className="absolute bottom-0 block h-[7px] w-[9px] rounded-sm border" style={{ borderColor: "currentColor" }} />
      <span className="absolute left-[1px] top-[-4px] block h-[6px] w-[7px] rounded-t-full border border-b-0" style={{ borderColor: "currentColor" }} />
    </span>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  theme,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  theme: WorkspaceTheme;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[12px]"
      style={{ borderColor: theme.pillBorder, backgroundColor: theme.pillBg, color: theme.textSecondary }}
    >
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
