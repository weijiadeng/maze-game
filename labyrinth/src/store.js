import { configureStore } from '@reduxjs/toolkit';
import controlReducer from './Labyrinth/Controls/controlSlice';

export default configureStore({
  reducer: {
    control: controlReducer,
  },
});
