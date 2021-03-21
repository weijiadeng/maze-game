import { createSlice } from '@reduxjs/toolkit';

export const EASY = 0;
export const MEDIUM = 1;
export const HARD = 2;
export const CUSTOM = 3;

export const gameModeSlice = createSlice({
    name: 'gameMode',
    initialState: {
        gameMode: 1
    },
    reducers: {
        setGameMode: (state, action) =>{
            state.gameMode = action.payload
        }
    },
});

export const {
    setGameMode,
} = gameModeSlice.actions;

export const selectGameMode = state => state.gameMode.gameMode;

export default gameModeSlice.reducer;
