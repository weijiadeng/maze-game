import { createSlice } from '@reduxjs/toolkit';
const INITIAL_MUTED_STATUS = false;

export const backgroundMusicSlice = createSlice({
    name: 'backgroundMusic',
    initialState: {
        IsMuted: INITIAL_MUTED_STATUS,
    },
    reducers: {
        toggleIsMuted: state => {
            state.IsMuted = !state.IsMuted;
            console.log("toggleIsMuted is called")
        },
    },
});

export const {
    toggleIsMuted,
} = backgroundMusicSlice.actions;

export const selectIsMuted = state => state.backgroundMusic.IsMuted;


export default backgroundMusicSlice.reducer;
