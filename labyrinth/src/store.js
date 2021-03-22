import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './reducers/controlSlice';
import elapseTimerReducer from './reducers/elapseTimerSlice';
import backgroundMusicReducer from './reducers/backgroundMusicSlice';
import playerStatusReducer from './reducers/playerStatusSlice';
import smallPopUpWindowReducer from './reducers/smallPopUpWindowSlice';
import programWindowReducer from './reducers/programWindowSlice';
import leaderboardReducer from './reducers/leaderboardSlice';
import gameModeReducer from './reducers/gameModeSlice';
import helperPageReducer from './reducers/helperPageSlice';


export default configureStore({
  reducer: {
    control: controlReducer,
    elapseTimer: elapseTimerReducer,
    backgroundMusic: backgroundMusicReducer,
    playerStatus: playerStatusReducer,
    smallPopUpWindow: smallPopUpWindowReducer,
    programWindow: programWindowReducer,
    leaderboard: leaderboardReducer,
    gameMode: gameModeReducer,
    helperPage: helperPageReducer,
  },
});
