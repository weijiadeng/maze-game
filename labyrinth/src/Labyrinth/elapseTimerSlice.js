import { createSlice } from '@reduxjs/toolkit';

export const elapseTimerSlice = createSlice({
    name: 'elapseTimer',
    initialState: {
        curNumSeconds: 0,
        running: null,
    },
    reducers: {
        countUp: state => {
            if (state.running === null) {
                state.running = true;
            }

            if (state.running === true) {
                state.curNumSeconds += 1;
            }
        },
        pauseCount: state => {
            state.running = false;
        },
        resumeCount: state => {
            state.running = true;
        }

    },
});

export const {
    countUp,
    pauseCount,
    resumeCount
} = elapseTimerSlice.actions;

export const selectCurNumSeconds = state => state.elapseTimer.curNumSeconds;

export default elapseTimerSlice.reducer;
