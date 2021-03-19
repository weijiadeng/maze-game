import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './reducers/controlSlice';
import elapseTimerReducer from './reducers/elapseTimerSlice';
import gameStatusReducer from './reducers/gameStatusSlice';
import backgroundMusicReducer from './reducers/backgroundMusicSlice';
import playerStatusReducer from './reducers/playerStatusSlice';
import smallPopUpWindowReducer from './reducers/smallPopUpWindowSlice';
import programWindowReducer from './reducers/programWindowSlice';
import leaderboardReducer from './reducers/leaderboardSlice';

export default configureStore({
  reducer: {
    control: controlReducer,
    elapseTimer: elapseTimerReducer,
    gameStatus: gameStatusReducer,
    backgroundMusic: backgroundMusicReducer,
    playerStatus: playerStatusReducer,
    smallPopUpWindow: smallPopUpWindowReducer,
    programWindow:programWindowReducer,
    leaderboard:leaderboardReducer
  },
});
