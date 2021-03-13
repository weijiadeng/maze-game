import { createSlice } from '@reduxjs/toolkit';

export const UNINIT = 0;
export const READY = 1;
export const RUNNING = 2;
export const PAUSE = 3;

export const elapseTimerSlice = createSlice({
    name: 'elapseTimer',
    initialState: {
        curNumSeconds: 0,
        status: UNINIT,
    },
    reducers: {
        countUp: state => {
            if (state.status === RUNNING) {
                state.curNumSeconds += 1;
            }
        },
        pauseCount: state => {
            state.status = PAUSE;
        },
        resumeCount: state => {
            state.status = RUNNING;
        },
        readyCount: state=>{
            state.status = READY;
        },
        resetCount: state => {
            state.curNumSeconds = 0;
        },
        adjustCountByAmount: (state, action) => {
            state.curNumSeconds += action.payload;
        }

    },
});

export const {
    countUp,
    pauseCount,
    resumeCount,
    resetCount,
    readyCount,
    adjustCountByAmount
} = elapseTimerSlice.actions;

export const selectCurNumSeconds = state => state.elapseTimer.curNumSeconds;
export const selectStatus = state => state.elapseTimer.status;


export default elapseTimerSlice.reducer;
