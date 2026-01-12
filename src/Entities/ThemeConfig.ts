import type { CurrentlyWatchingItem } from "./CurrentlyWatchingItem";

export interface ThemeConfig {
  locale: string;
  theme: "light" | "dark" | "system";
  menu: "vertical" | "collapsible-vertical" | "horizontal";
  layout: "full" | "boxed-layout";
  rtlClass: "rtl" | "ltr";
  animation: string;
  navbar: "navbar-sticky" | "navbar-floating" | "navbar-static";
  semidark: boolean;
  currentlyWatching: CurrentlyWatchingItem[];
}
