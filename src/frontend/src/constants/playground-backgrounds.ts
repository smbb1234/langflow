import mainBackgroundImage from "../assets/backgrounds/main-chat-bg.jpg";
import sidebarBackgroundImage from "../assets/backgrounds/sessions-bg.jpg";

export const PLAYGROUND_BACKGROUNDS = {
  main: mainBackgroundImage,
  sidebar: sidebarBackgroundImage,
} as const;

export const PLAYGROUND_OVERLAY_CLASSES = {
  main: "bg-white/35 dark:bg-black/45",
  sidebar: "bg-white/25 dark:bg-black/40",
} as const;