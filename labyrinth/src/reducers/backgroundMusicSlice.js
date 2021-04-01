import { createSlice } from "@reduxjs/toolkit";

export const START_PLAY = 0;
export const PLAYING = 1;
export const TO_STOP = 2;
export const STOPPED = 3;
export const TO_MUTE = 4;
export const MUTED = 4;

export const backgroundMusicSlice = createSlice({
  name: "backgroundMusic",
  initialState: {
    isPlaying: STOPPED,
  },
  reducers: {
    playBGM: (state) => {
      if (state.isPlaying !== MUTED) {
        state.isPlaying = START_PLAY;
      }
    },
    playingBGM: (state) => {
      state.isPlaying = PLAYING;
    },
    stopBGM: (state) => {
      if (state.isPlaying !== MUTED) {
        state.isPlaying = TO_STOP;
      }
    },
    unmuteBGM: (state) => {
      state.isPlaying = START_PLAY;
    },
    muteBGM: (state) => {
      state.isPlaying = TO_MUTE;
    },
    mutedBGM: (state) => {
      state.isPlaying = MUTED;
    },
    stopedBGM: (state) => {
      state.isPlaying = STOPPED;
    },
    resetBGM: (state) => {
      state.isPlaying = TO_STOP;
    },
  },
});

export const {
  playBGM,
  stopBGM,
  playingBGM,
  stopedBGM,
  muteBGM,
  unmuteBGM,
  mutedBGM,
} = backgroundMusicSlice.actions;

export const selectIsPlaying = (state) => state.backgroundMusic.isPlaying;

export default backgroundMusicSlice.reducer;
