# LoginPage (Enterprise Agent Workspace)

This page has been refactored to an enterprise workspace login layout with a split brand/auth experience.

## Notes

- Username/password authentication flow remains unchanged.
- OAuth, SAML SSO, forgot password, contact support, What's new, and footer links are UI placeholders only.
- Remember device is local UI state only (no cookie/localStorage persistence).
- Hero panel uses static copy and background layer until runtime telemetry wiring lands.

## V2 theme implementation notes (validated on 2026-05-24)

- Login and Agent Workspace now select local light/dark theme tokens from `useDarkStore((state) => state.dark)`.
- Login keeps `Sign Up` visible and non-submit (`type="button"`) while preserving the existing auth submit path.
- Agent Workspace keeps existing public flow load/access checks and does not alter `/playground/:id` behavior.
- Trace Console is rendered inside `RunMainPanel` to match the V2 landing composition.

## Future integration

- Wire tenant policy notice to real tenant policy configuration.
- Wire live run preview to runtime trace and guardrail telemetry.
- Wire status bar metadata to app configuration/runtime build metadata.
