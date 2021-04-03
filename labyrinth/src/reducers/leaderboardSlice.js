import { createSlice } from "@reduxjs/toolkit";
import { compareNumbers } from "../commons/utils";

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    list: {easy:[],medium:[],hard:[],pure:[]},
  },
  reducers: {
    appendToLeaderBoard: (state, action) => {
      const [mode, value] = [action.payload.mode, action.payload.value];
      state.list[mode].push(value);
      state.list[mode].sort(compareNumbers);
      if (state.list[mode].length > 10) {
        state.list[mode].pop();
      }
    },
  },
});

export const { appendToLeaderBoard } = leaderboardSlice.actions;

export const selectList = (state) => state.leaderboard.list;

export default leaderboardSlice.reducer;
