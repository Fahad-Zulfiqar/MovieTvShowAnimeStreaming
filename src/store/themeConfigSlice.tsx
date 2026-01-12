import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
import themeConfig from "../theme.config";
// import type { CurrentlyWatchingItem } from "../Entities/CurrentlyWatchingItem";
import type { ShowDetail } from "../Entities/TvShowDetails";
import type { Episode } from "../Entities/Episode";

const defaultState = {
  isDarkMode: false,
  mainLayout: "app",
  theme: "light",
  menu: "vertical",
  layout: "full",
  rtlClass: "ltr",
  animation: "",
  navbar: "navbar-sticky",
  locale: "en",
  sidebar: false,
  server: "https://111movies.com",
  pageTitle: "",
  currentlyWatching: [],
  languageList: [
    { code: "zh", name: "Chinese" },
    { code: "da", name: "Danish" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "hu", name: "Hungarian" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
    { code: "tr", name: "Turkish" },
  ],
  semidark: false,
};

const initialState = {
  theme: localStorage.getItem("theme") || themeConfig.theme,
  menu: localStorage.getItem("menu") || themeConfig.menu,
  layout: localStorage.getItem("layout") || themeConfig.layout,
  rtlClass: localStorage.getItem("rtlClass") || themeConfig.rtlClass,
  animation: localStorage.getItem("animation") || themeConfig.animation,
  navbar: localStorage.getItem("navbar") || themeConfig.navbar,
  locale: localStorage.getItem("i18nextLng") || themeConfig.locale,
  isDarkMode: false,
  sidebar: localStorage.getItem("sidebar") || defaultState.sidebar,
  semidark: localStorage.getItem("semidark") || themeConfig.semidark,
  server: localStorage.getItem("server") || defaultState.server,
  currentlyWatching:
    JSON.parse(localStorage.getItem("currentlyWatching") || "[]") || [],
  languageList: defaultState.languageList,
};

const themeConfigSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      payload = payload || state.theme; // light | dark | system
      localStorage.setItem("theme", payload);
      state.theme = payload;
      if (payload === "light") {
        state.isDarkMode = false;
      } else if (payload === "dark") {
        state.isDarkMode = true;
      } else if (payload === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector("body")?.classList.add("dark");
      } else {
        document.querySelector("body")?.classList.remove("dark");
      }
    },
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      state.sidebar = false; // reset sidebar state
      localStorage.setItem("menu", payload);
      state.menu = payload;
    },
    toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      localStorage.setItem("layout", payload);
      state.layout = payload;
    },
    toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass; // rtl, ltr
      localStorage.setItem("rtlClass", payload);
      state.rtlClass = payload;
      document
        .querySelector("html")
        ?.setAttribute("dir", state.rtlClass || "ltr");
    },
    toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem("animation", payload);
      state.animation = payload;
    },
    switchServer(state, { payload }) {
      const newServer = payload?.trim() || state.server; // Get new server from payload
      localStorage.setItem("server", newServer); // Store in local storage
      state.server = newServer; // Update state
    },
    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem("navbar", payload);
      state.navbar = payload;
    },
    toggleSemidark(state, { payload }) {
      payload = payload === true || payload === "true" ? true : false;
      localStorage.setItem("semidark", payload);
      state.semidark = payload;
    },
    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      i18next.changeLanguage(payload);
      state.locale = payload;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    setPageTitle(state, { payload }) {
      document.title = `${payload} | FZ movies `;
    },
    addToCurrentlyWatching(state, { payload }) {
      // Find the index of the existing show in the currently watching list
      const existingShowIndex = state.currentlyWatching.findIndex(
        (item: Episode) => item.show_id === payload.show_id
      );

      if (existingShowIndex !== -1) {
        // If the show is already in the list, replace the existing episode
        state.currentlyWatching[existingShowIndex] = payload;
      } else {
        // If the show is not in the list, add the new episode
        state.currentlyWatching.push(payload);
      }

      // Save the updated list to localStorage
      localStorage.setItem(
        "currentlyWatching",
        JSON.stringify(state.currentlyWatching)
      );
    },

    removeFromCurrentlyWatching(state, { payload }) {
      state.currentlyWatching = state.currentlyWatching.filter(
        (item: ShowDetail) => item.id !== payload
      );
      localStorage.setItem(
        "currentlyWatching",
        JSON.stringify(state.currentlyWatching)
      ); // Save to localStorage
    },

    clearCurrentlyWatching(state) {
      state.currentlyWatching = [];
      localStorage.removeItem("currentlyWatching"); // Clear from localStorage
    },

    addMovieToCurrentlyWatching(state, { payload }) {
      state.currentlyWatching.push(payload);

      // Save the updated list to localStorage
      localStorage.setItem(
        "currentlyWatching",
        JSON.stringify(state.currentlyWatching)
      );
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleRTL,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
  toggleLocale,
  toggleSidebar,
  setPageTitle,
  switchServer,
  addToCurrentlyWatching,
  removeFromCurrentlyWatching,
  clearCurrentlyWatching,
  addMovieToCurrentlyWatching,
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
