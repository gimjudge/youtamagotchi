import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './message';
import appetiteReducer from './appetite';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    appetite: appetiteReducer
  }
});