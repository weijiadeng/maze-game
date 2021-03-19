import { createSlice } from '@reduxjs/toolkit';
import { compareNumbers } from '../commons/utils'

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        list: []
    },
    reducers: {
        appendToLeaderBoard: (state, action) => {
            state.list.push(action.payload);
            state.list.sort(compareNumbers);
            if (state.list.length > 10) {
                state.list.pop();
            }
        }
    },
});

export const {
    appendToLeaderBoard
} = leaderboardSlice.actions;

export const selectList = state => state.leaderboard.list;


export default leaderboardSlice.reducer;
