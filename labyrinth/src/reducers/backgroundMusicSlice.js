import { createSlice } from '@reduxjs/toolkit';

export const START_PLAY = 0;
export const PLAYING = 1;
export const TO_STOP = 2;
export const STOPPED = 3;

export const backgroundMusicSlice = createSlice({
    name: 'backgroundMusic',
    initialState: {
        isPlaying: STOPPED,
    },
    reducers: {
        playBGM: state => {
            state.isPlaying = START_PLAY;
        },
        playingBGM: state => {
            state.isPlaying = PLAYING;
        },
        stopBGM: state => {
            state.isPlaying = TO_STOP;
        },
        stopedBGM: state => {
            state.isPlaying = STOPPED;
        },
    },
});

export const {
    playBGM, stopBGM, playingBGM, stopedBGM
} = backgroundMusicSlice.actions;

export const selectIsPlaying = state => state.backgroundMusic.isPlaying;


export default backgroundMusicSlice.reducer;
