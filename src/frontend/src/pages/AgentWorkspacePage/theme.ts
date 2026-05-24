export type WorkspaceTheme = {
  pageBackground: string;
  panelBackground: string;
  cardBackground: string;
  cardAltBackground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderPrimary: string;
  borderSoft: string;
  accent: string;
  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
  buttonSecondaryBackground: string;
  buttonSecondaryText: string;
  success: string;
  warning: string;
  divider: string;
  track: string;
};

export const workspaceDarkTheme: WorkspaceTheme = {
  pageBackground: "#0a1018",
  panelBackground: "#0d1522",
  cardBackground: "#121b2b",
  cardAltBackground: "#111b2b",
  textPrimary: "#f1f5f9",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  borderPrimary: "#1e293b",
  borderSoft: "rgba(255, 255, 255, 0.1)",
  accent: "#00d1e5",
  buttonPrimaryBackground: "#00d1e5",
  buttonPrimaryText: "#ffffff",
  buttonSecondaryBackground: "#1a2537",
  buttonSecondaryText: "#cbd5e1",
  success: "#22c55e",
  warning: "#fbbf24",
  divider: "rgba(255, 255, 255, 0.1)",
  track: "#334155",
};

export const workspaceLightTheme: WorkspaceTheme = {
  ...workspaceDarkTheme,
  accent: "#00c7d9",
  buttonPrimaryBackground: "#00c7d9",
};
