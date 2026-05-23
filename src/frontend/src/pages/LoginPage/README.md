# LoginPage (Enterprise Agent Workspace)

This page has been refactored to an enterprise workspace login layout with a split brand/auth experience.

## Notes

- Username/password authentication flow remains unchanged.
- OAuth, SAML SSO, forgot password, contact support, What's new, and footer links are UI placeholders only.
- Remember device is local UI state only (no cookie/localStorage persistence).
- LiveRunPreviewCard and StatusBar use static mock values for now.

## Future integration

- Wire tenant policy notice to real tenant policy configuration.
- Wire live run preview to runtime trace and guardrail telemetry.
- Wire status bar metadata to app configuration/runtime build metadata.
