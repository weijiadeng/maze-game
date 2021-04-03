import { createSlice } from "@reduxjs/toolkit";
import { compareNumbers } from "../commons/utils";

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    list: [],
    isShowLeaderboard: false,
  },
  reducers: {
    appendToLeaderBoard: (state, action) => {
      state.list.push(action.payload);
      state.list.sort(compareNumbers);
      if (state.list.length > 10) {
        state.list.pop();
      }
    },
    toggleIsShowLeaderboard: state => {
      state.isShowLeaderboard = !state.isShowLeaderboard;
    }
  },
});

export const { appendToLeaderBoard, toggleIsShowLeaderboard } = leaderboardSlice.actions;

export const selectList = (state) => state.leaderboard.list;
export const selectIsShowLeaderboard = (state) => state.leaderboard.isShowLeaderboard;

export default leaderboardSlice.reducer;
