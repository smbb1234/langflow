import { useMemo, useState } from "react";
import { useDarkStore } from "@/stores/darkStore";

type JaiLogoVariant = "auto" | "dark" | "light";

export function JaiLogo({
  className = "",
  variant = "auto",
}: {
  className?: string;
  variant?: JaiLogoVariant;
}) {
  const dark = useDarkStore((state) => state.dark);
  const [hasLightError, setHasLightError] = useState(false);

  const logoSrc = useMemo(() => {
    const resolvedVariant = variant === "auto" ? (dark ? "dark" : "light") : variant;

    if (resolvedVariant === "light" && !hasLightError) {
      return "/jai/jai-logo-light.png";
    }

    return "/jai/jai-logo-dark.png";
  }, [dark, hasLightError, variant]);

  const handleError = () => {
    if (logoSrc.includes("jai-logo-light")) {
      setHasLightError(true);
    }
  };

  return (
    <img
      src={logoSrc}
      alt="JAI — No-Code Agentic AI Platform by Diagonal Matrix"
      draggable={false}
      onError={handleError}
      className={`block select-none object-contain object-left ${className}`}
    />
  );
}
