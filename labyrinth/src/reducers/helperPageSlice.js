import { createSlice } from '@reduxjs/toolkit';
const INITIAL_HELPER_PAGE_SHOWN_STATUS = false;

export const helperPageSlice = createSlice({
    name: 'helperPage',
    initialState: {
        shown: INITIAL_HELPER_PAGE_SHOWN_STATUS,
    },
    reducers: {
        toggleShown: state => {
            state.shown = !state.shown;
        },
    },
});

export const {
    toggleShown,
} = helperPageSlice.actions;

export const selectShown = state => state.helperPage.shown;


export default helperPageSlice.reducer;
