import { useState, type CSSProperties, type PointerEvent } from "react";

import { RESIZER_SIZE } from "../constants";
import type { WorkspaceTheme } from "../theme";

type ResizeHandleProps = {
  orientation: "vertical" | "horizontal";
  ariaLabel: string;
  onResizeStart: (event: PointerEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
  theme?: WorkspaceTheme;
};

export function ResizeHandle({
  orientation,
  ariaLabel,
  onResizeStart,
  className,
  style,
  theme,
}: ResizeHandleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isVertical = orientation === "vertical";

  return (
    <div
      aria-label={ariaLabel}
      aria-orientation={isVertical ? "vertical" : "horizontal"}
      className={className}
      onPointerDown={onResizeStart}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      role="separator"
      style={{
        backgroundColor: isHovered
          ? (theme?.primaryStrong ?? theme?.panelBorder)
          : "transparent",
        cursor: isVertical ? "col-resize" : "row-resize",
        flexShrink: 0,
        height: isVertical ? "100%" : RESIZER_SIZE,
        touchAction: "none",
        transition: "background-color 120ms ease",
        width: isVertical ? RESIZER_SIZE : "100%",
        ...style,
      }}
      tabIndex={0}
    />
  );
}
