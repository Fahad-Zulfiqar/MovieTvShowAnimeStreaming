// store/watchedEpisodesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const watchedEpisodesSlice = createSlice({
  name: "watchedEpisodes",
  initialState: [] as number[], // Array of watched episode IDs
  reducers: {
    addWatchedEpisode: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    removeWatchedEpisode: (state, action: PayloadAction<number>) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { addWatchedEpisode, removeWatchedEpisode } =
  watchedEpisodesSlice.actions;
export default watchedEpisodesSlice.reducer;
