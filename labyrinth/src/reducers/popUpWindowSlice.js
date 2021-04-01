import { createSlice } from "@reduxjs/toolkit";

const INITIAL_PRESENSE = false;
export const NOT_PRESENT = 0;
export const EVENT_WINDOW = 1;
export const HELPER_WINDOW = 2;
export const CONFIRM_WINDOW = 3;

export const popUpWindowSlice = createSlice({
  name: "popUpWindow",
  initialState: {
    smallPopUpPresense: INITIAL_PRESENSE,
    smallPopIsToOpen: INITIAL_PRESENSE,
    bigPopUpPresense: NOT_PRESENT,
    bigPopUpIsToOpen: NOT_PRESENT,
  },
  reducers: {
    enableSmallPopUpPresense: (state) => {
      state.smallPopUpPresense = true;
    },
    disableSmallPopUpPresense: (state) => {
      state.smallPopUpPresense = false;
    },
    enableSmallPopUpIsToOpen: (state) => {
      state.smallPopIsToOpen = true;
    },
    disableSmallPopUpIsToOpen: (state) => {
      state.smallPopIsToOpen = false;
    },
    enableBigPopUpPresense: (state, action) => {
      state.bigPopUpPresense = action.payload;
    },
    disableBigPopUpPresense: (state) => {
      state.bigPopUpPresense = false;
    },
    enableBigPopUpIsToOpen: (state, action) => {
      state.bigPopUpIsToOpen = action.payload;
    },
    disableBigPopUpIsToOpen: (state) => {
      state.bigPopUpIsToOpen = NOT_PRESENT;
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
  disableBigPopUpIsToOpen,
} = popUpWindowSlice.actions;

export const selectSmallPopUpPresense = (state) =>
  state.popUpWindow.smallPopUpPresense;
export const selectSmallPopUpIsToOpen = (state) =>
  state.popUpWindow.smallPopIsToOpen;
export const selectBigPopUpPresense = (state) =>
  state.popUpWindow.bigPopUpPresense;
export const selectBigPopUpIsToOpen = (state) =>
  state.popUpWindow.bigPopUpIsToOpen;

export default popUpWindowSlice.reducer;
