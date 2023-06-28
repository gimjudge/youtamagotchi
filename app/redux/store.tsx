import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './message';
import appetiteReducer from './appetite';
import sizeReducer from './size';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    appetite: appetiteReducer,
    size: sizeReducer
  }
});