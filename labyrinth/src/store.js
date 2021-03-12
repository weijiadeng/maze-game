import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './Labyrinth/Controls/controlSlice';
import elapseTimerReducer from './Labyrinth/elapseTimerSlice';

export default configureStore({
  reducer: {
    control: controlReducer,
    elapseTimer: elapseTimerReducer,
  },
});
