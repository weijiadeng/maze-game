import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './reducers/controlSlice';
import elapseTimerReducer from './reducers/elapseTimerSlice';
import backgroundMusicReducer from './reducers/backgroundMusicSlice';
import playerStatusReducer from './reducers/playerStatusSlice';
import popUpWindowReducer from './reducers/popUpWindowSlice';
import leaderboardReducer from './reducers/leaderboardSlice';
import helperPageReducer from './reducers/helperPageSlice';


export default configureStore({
  reducer: {
    control: controlReducer,
    elapseTimer: elapseTimerReducer,
    backgroundMusic: backgroundMusicReducer,
    playerStatus: playerStatusReducer,
    popUpWindow: popUpWindowReducer,
    leaderboard: leaderboardReducer,
    helperPage: helperPageReducer,
  },
});
