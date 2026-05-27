import { type FormEvent, type KeyboardEvent, useMemo, useState } from "react";
import type { AgentWorkspaceRun } from "../types";
import type { WorkspaceTheme } from "../theme";

type WorkspacePromptInputProps = {
  theme: WorkspaceTheme;
  run: AgentWorkspaceRun;
  onSubmitPrompt?: (prompt: string) => void;
  onAttach?: () => void;
  onSelectEvidenceScope?: () => void;
  onSelectAgent?: () => void;
};

export function WorkspacePromptInput({
  theme,
  run,
  onSubmitPrompt,
  onAttach,
  onSelectEvidenceScope,
  onSelectAgent,
}: WorkspacePromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const evidenceScopeLabel = useMemo(() => run.evidence.warehouse || "finance_curated", [run.evidence.warehouse]);
  const agentLabel = useMemo(() => run.agentName || "finance_sql_agent", [run.agentName]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();

    if (onSubmitPrompt) {
      onSubmitPrompt(prompt);
      return;
    }

    // TODO: wire prompt submission to run continuation endpoint.
  };

  const handleKeyboardSubmit = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const isShortcutPressed = event.metaKey || event.ctrlKey;
    if (!isShortcutPressed) {
      return;
    }

    event.preventDefault();
    handleSubmit();
  };

  const handleAttachClick = () => {
    if (onAttach) {
      onAttach();
      return;
    }

    // TODO: wire attachment selection workflow.
  };

  const handleSelectEvidenceScopeClick = () => {
    if (onSelectEvidenceScope) {
      onSelectEvidenceScope();
      return;
    }

    // TODO: wire evidence scope picker workflow.
  };

  const handleSelectAgentClick = () => {
    if (onSelectAgent) {
      onSelectAgent();
      return;
    }

    // TODO: wire agent picker workflow.
  };

  return (
    <div className="h-full border-t px-4 py-2" style={{ borderColor: theme.panelBorder }}>
      <div className="mx-auto h-full w-full max-w-[760px]" data-testid="workspace-composer-centered-wrapper">
      <form
        className="flex h-full min-h-0 flex-col rounded-[10px] border px-3 py-2"
        style={{ borderColor: theme.panelBorder, backgroundColor: theme.surface }}
        onSubmit={handleSubmit}
      >
        <textarea
          aria-label="Continue run prompt"
          className="min-h-0 flex-1 w-full resize-none bg-transparent text-sm leading-[1.35] outline-none"
          style={{ color: theme.textPrimary }}
          placeholder="Ask the agent, refine the analysis, or paste a URL…"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={handleKeyboardSubmit}
        />
        <div className="mt-auto flex items-center justify-between gap-2 text-xs" style={{ color: theme.textTertiary }}>
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
            <button
              className="rounded-[8px] border px-3 py-1.5 text-[12px]"
              style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}
              type="button"
              onClick={handleAttachClick}
            >
              📎 Attach
            </button>
            <button
              className="rounded-[8px] border px-3 py-1.5 text-[12px]"
              style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}
              type="button"
              onClick={handleSelectEvidenceScopeClick}
            >
              ⊞ {evidenceScopeLabel}
            </button>
            <button
              className="rounded-[8px] border px-3 py-1.5 text-[12px]"
              style={{ borderColor: theme.panelBorder, backgroundColor: theme.surfaceMuted, color: theme.textSecondary }}
              type="button"
              onClick={handleSelectAgentClick}
            >
              ⚙ {agentLabel}
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span>⌘↵ to send</span>
            <button className="rounded px-3 py-1.5 text-[12px]" style={{ backgroundColor: theme.primary, color: theme.surface }} type="submit">
              ↗ Send
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
