import { createSlice } from '@reduxjs/toolkit';

export const WELCOME = 0;
export const MODE_SELECTION = 1;
export const GAME = 2;
export const GUIDE = 3;

export const programWindowSlice = createSlice({
    name: 'programWindow',
    initialState: {
        window: WELCOME
    },
    reducers: {
        displayWelcome: state => {
            state.window = WELCOME;
        },
        displayModeSelection: state => {
            state.window = MODE_SELECTION;
        },
        displayGame: state => {
            state.window = GAME;
        },
        displayGuide: state => {
            state.window = GUIDE;
        }
    },
});

export const {
    displayWelcome,
    displayModeSelection,
    displayGame,
    displayGuide,
} = programWindowSlice.actions;

export const selectWindow = state => state.programWindow.window;

export default programWindowSlice.reducer;
