import { createSlice } from '@reduxjs/toolkit';

const INITIAL_PRESENSE = true;
export const smallPopUpWindowSlice = createSlice({
    name: 'smallPopUpWindow',
    initialState: {
        presense: INITIAL_PRESENSE,
    },
    reducers: {
        enablePresense: state => {
            state.presense = true;
        },
        disablePresense: state => {
            state.presense = false;
        },
    },
});

export const {
    enablePresense,
    disablePresense,
} = smallPopUpWindowSlice.actions;

export const selectPresense = state => state.smallPopUpWindow.presense;

export default smallPopUpWindowSlice.reducer;
