export type LoginTheme = {
  pageBackground: string;
  pageBackgroundAlt: string;
  panelBackground: string;
  panelInsetBackground: string;
  cardBackground: string;
  cardSoftBackground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderPrimary: string;
  borderStrong: string;
  separator: string;
  accent: string;
  titleAccent: string;
  brandGradient: string;
  trackActive: string;
  trackDone: string;
  trackPending: string;
  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
  buttonSecondaryBackground: string;
  buttonSecondaryText: string;
  buttonSecondaryBorder: string;
  success: string;
  successBackground: string;
  warning: string;
  warningBackground: string;
  infoBackground: string;
  badgeBackground: string;
  badgeText: string;
  statusBadgeBackground: string;
  statusBadgeText: string;
  signUpBackground: string;
  signUpText: string;
};

export const loginDarkTheme: LoginTheme = {
  pageBackground: "#020617",
  pageBackgroundAlt: "#070d14",
  panelBackground: "#0a1018",
  panelInsetBackground: "#0d1420",
  cardBackground: "#0a1018",
  cardSoftBackground: "#031d2e",
  textPrimary: "#f1f5f9",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  borderPrimary: "#1e293b",
  borderStrong: "#334155",
  separator: "#1a2535",
  accent: "#00d1e5",
  titleAccent: "#00d1e5",
  brandGradient: "linear-gradient(to bottom, #0d0d1f, #14122e, #1f1a38)",
  trackActive: "#00d1e5",
  trackDone: "#337399",
  trackPending: "#1a2535",
  buttonPrimaryBackground: "#00d1e5",
  buttonPrimaryText: "#ffffff",
  buttonSecondaryBackground: "#0d1420",
  buttonSecondaryText: "#cbd5e1",
  buttonSecondaryBorder: "#334155",
  success: "#22c55e",
  successBackground: "#021b0c",
  warning: "#fbbf24",
  warningBackground: "#301209",
  infoBackground: "#0f172a",
  badgeBackground: "#031d2e",
  badgeText: "#00d1e5",
  statusBadgeBackground: "#021b0c",
  statusBadgeText: "#4ade80",
  signUpBackground: "#1f2937",
  signUpText: "#f8fafc",
};

export const loginLightTheme: LoginTheme = {
  ...loginDarkTheme,
  accent: "#00c7d9",
  titleAccent: "#00c7d9",
  buttonPrimaryBackground: "#00c7d9",
  badgeText: "#00c7d9",
  trackActive: "#00c7d9",
  signUpBackground: "#e2f8fb",
  signUpText: "#0f172a",
};
