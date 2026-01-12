import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";
import watchConfigSlice from "./watchEpisodeSlice";
import authSlice from "./authSlice";
// import Watch from "../pages/Watch";

// Combine reducers
const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  watchConfig: watchConfigSlice,
  auth: authSlice,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
});

// Export the store
export default store;

// Type for the root state
export type IRootState = ReturnType<typeof rootReducer>;
