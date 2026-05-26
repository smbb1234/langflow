export function JaiLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/jai/jai-logo.png"
      alt="JAI — No-Code Agentic AI Platform by Diagonal Matrix"
      draggable={false}
      className={`block select-none object-contain object-left ${className}`}
    />
  );
}
