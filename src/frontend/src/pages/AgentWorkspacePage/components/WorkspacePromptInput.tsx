import { type FormEvent, useState } from "react";
import type { WorkspaceTheme } from "../theme";

type WorkspacePromptInputProps = {
  theme: WorkspaceTheme;
};

export function WorkspacePromptInput({ theme }: WorkspacePromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="h-full border-t px-4 py-2" style={{ borderColor: theme.panelBorder }}>
      <form className="flex h-full flex-col rounded-[10px] border px-3 py-2" style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }} onSubmit={handleSubmit}>
        <input aria-label="Continue run prompt" className="w-full bg-transparent text-[13px] outline-none" style={{ color: theme.textPrimary }} placeholder="Ask the agent, refine the analysis, or paste a URL…" type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <div className="mt-auto flex items-center justify-between text-[11px]" style={{ color: theme.textTertiary }}>
          <div className="flex gap-2"><span>📎 Attach</span><span>⊞ finance_curated</span><span>⚙ finance_sql_agent</span></div>
          <div className="flex items-center gap-3"><span>⌘↵ to send</span><button className="rounded px-2 py-1" style={{ backgroundColor: theme.primary, color: "#fff" }} type="submit">↗ Send</button></div>
        </div>
      </form>
    </div>
  );
}
