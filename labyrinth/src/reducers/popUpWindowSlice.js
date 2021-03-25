import { createSlice } from '@reduxjs/toolkit';

const INITIAL_PRESENSE = false;
export const popUpWindowSlice = createSlice({
    name: 'popUpWindow',
    initialState: {
        smallPopUpPresense: INITIAL_PRESENSE,
        smallPopIsToOpen: INITIAL_PRESENSE,
        bigPopUpPresense: INITIAL_PRESENSE,
        bigPopUpIsToOpen: INITIAL_PRESENSE
    },
    reducers: {
        enableSmallPopUpPresense: state => {
            state.smallPopUpPresense = true;
        },
        disableSmallPopUpPresense: state => {
            state.smallPopUpPresense = false;
        },
        enableSmallPopUpIsToOpen: state => {
            state.smallPopIsToOpen = true;
        },
        disableSmallPopUpIsToOpen: state => {
            state.smallPopIsToOpen = false;
        },
        enableBigPopUpPresense: state => {
            state.bigPopUpPresense = true;
        },
        disableBigPopUpPresense: state => {
            state.bigPopUpPresense = false;
        },
        enableBigPopUpIsToOpen: state => {
            state.bigPopUpIsToOpen = true;
        },
        disableBigPopUpIsToOpen: state => {
            state.bigPopUpIsToOpen = false;
        },
    },
});

export const {
    enableSmallPopUpPresense,
    disableSmallPopUpPresense,
    enableSmallPopUpIsToOpen,
    disableSmallPopUpIsToOpen,
    enableBigPopUpPresense,
    disableBigPopUpPresense,
    enableBigPopUpIsToOpen,
    disableBigPopUpIsToOpen
} = popUpWindowSlice.actions;

export const selectSmallPopUpPresense = state => state.popUpWindow.smallPopUpPresense;
export const selectSmallPopUpIsToOpen = state => state.popUpWindow.smallPopIsToOpen;
export const selectBigPopUpPresense = state => state.popUpWindow.bigPopUpPresense;
export const selectBigPopUpIsToOpen = state => state.popUpWindow.bigPopUpIsToOpen;


export default popUpWindowSlice.reducer;
