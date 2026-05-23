import { SAMPLE_MESSAGES } from "../constants";

export function ConversationPanel() {
  return (
    <section className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 lg:px-6">
      {SAMPLE_MESSAGES.map((message) => (
        <article
          className="rounded-[14px] border border-white/10 bg-[#121d2e] p-3"
          key={message.id}
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>{message.role}</span>
            <span>{message.timestamp}</span>
          </div>
          <p className="text-sm text-slate-100">{message.content}</p>
        </article>
      ))}
    </section>
  );
}
