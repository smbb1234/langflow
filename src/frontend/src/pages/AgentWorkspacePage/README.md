# AgentWorkspacePage

JAI Agent Workspace prototype for `/workspace/:id/`.

## Current status

- This page is intentionally implemented as a prototype UI.
- It currently renders mock data from `MOCK_AGENT_WORKSPACE_RUN`.
- No real backend run execution is implemented here yet.

## Integration roadmap (TODO)

Future iterations should replace mock state with production contracts and streaming behavior:

1. Run stream integration (live run updates/events).
2. Approval workflow integration (human-in-the-loop actions).
3. Evidence provenance integration (traceable source attribution).
4. Guardrail telemetry integration (policy/eval runtime signals).
5. Trace events integration (timeline/raw/retry/guardrail event stream).
6. Prompt continuation integration (submit follow-up prompts to active run).

## Notes

- Keep backend untouched while this prototype evolves.
- Preserve typed interfaces and explicit TODO markers where integrations will connect.
