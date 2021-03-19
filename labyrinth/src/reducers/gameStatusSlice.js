import { createSlice } from '@reduxjs/toolkit';

export const gameStatusSlice = createSlice({
    name: 'gameStatus',
    initialState: {
        speedModifier: 1,
        showMiniMap: false,
        isDark: false,
        randomError: false,
    },
    reducers: {
        speedUp: state => {
            state.speedModifier *= 1.5;
        },
        speedDown: state => {
            state.speedModifier /= 1.5;
        },
        enableMiniMap: state => {
            state.showMiniMap = true;
        },
        disableMiniMap: state=>{
            state.showMiniMap = false;
        },
        enableDarkMode: state=>{
            state.isDark = true;
        },
        disableDarkMode: state => {
            state.isDark = false;
        },
        enableRandomError: state=>{
            state.randomError = true;
        },
        disableRandomError: state=>{
            state.randomError = false;
        }

    },
});

export const {
    speedUp,
    speedDown,
    enableMiniMap,
    disableMiniMap,
    enableDarkMode,
    disableDarkMode,
    enableRandomError,
    disableRandomError
} = gameStatusSlice.actions;

export const selectSpeedModifier = state => state.gameStatus.speedModifier;
export const selectShowMiniMap = state => state.gameStatus.showMiniMap;
export const selectIsDark = state => state.gameStatus.isDark;
export const selectRandomError = state => state.gameStatus.randomError;


export default gameStatusSlice.reducer;
