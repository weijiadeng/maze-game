import { createSlice } from '@reduxjs/toolkit';

const INITIAL_HP = 100;
export const playerStatusSlice = createSlice({
    name: 'playerStatus',
    initialState: {
        HP: INITIAL_HP,
        buff: [],
        debuff: []
    },
    reducers: {
        decreaseHP: (state, action) => {
            state.HP -= action.payload;
            if (state.HP < 0) {
                state.HP = 0;
            }
        },
        increaseHP: (state, action) => {
            if (state.HP === INITIAL_HP) {
                return;
            }
            state.HP += action.payload;
        },
        resetBuffAndDebuff: state => {
            state.buff = [];
            state.debuff = [];
        },
        addABuff: (state, action) => {
            // Check whether the buff is already there, since the buff doesn't apply multiple times.
            if (state.buff.includes(action.payload)) {
                return;
            }
            state.buff = [...state.buff, action.payload];
        },
        removeABuff: (state, action) => {
            state.buff = state.buff.filter(buffName => buffName !== action.payload);
        },
        addADebuff: (state, action) => {
            // Check whether the buff is already there, since the buff doesn't apply multiple times.
            if (state.debuff.includes(action.payload)) {
                return;
            }
            state.debuff = [...state.debuff, action.payload];
        },
        removeADebuff: (state, action) => {
            state.debuff = state.debuff.filter(buffName => buffName !== action.payload);
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
} = playerStatusSlice.actions;

export const selectHP = state => state.playerStatus.HP;
export const selectBuff = state => state.playerStatus.buff;
export const selectDebuff = state => state.playerStatus.debuff;

export default playerStatusSlice.reducer;
