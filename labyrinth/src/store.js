import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './Labyrinth/Controls/controlSlice';
import elapseTimerReducer from './Labyrinth/elapseTimerSlice';
import gameStatusReducer from './Labyrinth/GameStatus/gameStatusSlice';
import backgroundMusicReducer from './commons/backgroundMusicSlice';
import playerStatusReducer from './reducers/playerStatusSlice';
import smallPopUpWindowReducer from './reducers/smallPopUpWindowSlice';

export default configureStore({
  reducer: {
    control: controlReducer,
    elapseTimer: elapseTimerReducer,
    gameStatus: gameStatusReducer,
    backgroundMusic: backgroundMusicReducer,
    playerStatus: playerStatusReducer,
    smallPopUpWindow: smallPopUpWindowReducer,
  },
});
