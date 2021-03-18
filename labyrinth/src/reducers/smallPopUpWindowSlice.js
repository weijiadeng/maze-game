import { createSlice } from '@reduxjs/toolkit';

const INITIAL_PRESENSE = false;
export const smallPopUpWindowSlice = createSlice({
    name: 'smallPopUpWindow',
    initialState: {
        presense: INITIAL_PRESENSE,
        isToOpen: INITIAL_PRESENSE,
    },
    reducers: {
        enablePresense: state => {
            state.presense = true;
        },
        disablePresense: state => {
            state.presense = false;
        },
        enableIsToOpen: state => {
            state.isToOpen = true;
        },
        disableIsToOpen: state => {
            state.isToOpen = false;
        },
    },
});

export const {
    enablePresense,
    disablePresense,
    enableIsToOpen,
    disableIsToOpen,
} = smallPopUpWindowSlice.actions;

export const selectPresense = state => state.smallPopUpWindow.presense;
export const selectIsToOpen = state => state.smallPopUpWindow.isToOpen;


export default smallPopUpWindowSlice.reducer;
