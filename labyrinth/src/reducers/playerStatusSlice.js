import { createSlice } from "@reduxjs/toolkit";

const INITIAL_HP = 100;

// Buff and debuff are represented using bitsets
export const MINI_MAP_ON = 1 << 0;
export const DARK_MODE_ON = 1 << 1;
export const SPEED_UP = 1 << 2;

export const MINI_MAP_OFF = 1 << 0;
export const DARK_MODE_OFF = 1 << 1;
export const SPEED_DOWN = 1 << 2;

export const playerStatusSlice = createSlice({
  name: "playerStatus",
  initialState: {
    HP: INITIAL_HP,
    buff: 0,
    debuff: 0,
    isTimeUsedUp: false
  },
  reducers: {
    decreaseHP: (state, action) => {
      state.HP -= action.payload;
      if (state.HP < 0) {
        state.HP = 0;
      }
    },
    increaseHP: (state, action) => {
      // HP cannot be greater than init value
      state.HP += action.payload;
      if (state.HP > INITIAL_HP) {
        state.HP = INITIAL_HP;
      }
    },
    resetBuffAndDebuff: (state) => {
      state.buff = 0;
      state.debuff = 0;
    },
    addABuff: (state, action) => {
      state.buff |= action.payload;
    },
    removeABuff: (state, action) => {
      state.buff &= ~action.payload;
    },
    addADebuff: (state, action) => {
      state.debuff |= action.payload;
    },
    removeADebuff: (state, action) => {
      state.debuff &= ~action.payload;
    },
    setTimeUsedUp: state=> {
      state.isTimeUsedUp = true;
    },
    resetPlayerStatus: (state) => {
      state.HP = INITIAL_HP;
      state.buff = 0;
      state.debuff = 0;
      state.isTimeUsedUp = false;
    },
  },
});

export const {
  decreaseHP,
  increaseHP,
  resetBuffAndDebuff,
  addABuff,
  removeABuff,
  addADebuff,
  removeADebuff,
  resetPlayerStatus,
  setTimeUsedUp
} = playerStatusSlice.actions;

export const selectHP = (state) => state.playerStatus.HP;
export const selectBuff = (state) => state.playerStatus.buff;
export const selectDebuff = (state) => state.playerStatus.debuff;
export const selectIsTimeUsedUp = (state) => state.playerStatus.isTimeUsedUp;

export default playerStatusSlice.reducer;
