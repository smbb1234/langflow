import { type FormEvent, useState } from "react";

type WorkspacePromptInputProps = {
  onSubmitPrompt?: (prompt: string) => void;
};

export function WorkspacePromptInput({
  onSubmitPrompt,
}: WorkspacePromptInputProps) {
  const [prompt, setPrompt] = useState("");

  // TODO: connect WorkspacePromptInput to real run continuation API.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmitPrompt?.(prompt);
  };

  return (
    <div className="border-t border-white/10 px-4 py-3 lg:px-6">
      <form
        className="flex items-center gap-2 rounded-[14px] border border-white/10 bg-[#111b2b] p-2"
        onSubmit={handleSubmit}
      >
        <input
          aria-label="Continue run prompt"
          className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="Continue describing your goal or add constraints..."
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button
          className="rounded-[10px] bg-sky-500 px-3 py-2 text-xs font-medium text-white"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
