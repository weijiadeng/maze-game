import { createSlice } from "@reduxjs/toolkit";

// The difference between mute and stop is, after muted the BGM cannot be
// played by calling dispatch(play()), unless dispatch(resumeBGM()) is called,
// while stopped BGM can be played by calling dispatch(playBGM()).
// This is to make the muted state preserved even after going back to welcome
// page and restart the game again.

// START_PLAY, TO_STOP, TO_MUTE: the state of submitted but not executued requests
// for the BGM.
// PLAYING, STOPPED, MUTED: the state of executued request for the BGM.

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
      // When state.isPlaying is muted, it cannot be played again unless
      // unmute.
      if (state.isPlaying !== MUTED && state.isPlaying !== TO_MUTE) {
        state.isPlaying = START_PLAY;
      }
    },
    playingBGM: (state) => {
      state.isPlaying = PLAYING;
    },
    stopBGM: (state) => {
      // Do not overwrite the mute state, given that mute
      // state is more powerful.
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
