import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import appReducer from './slices/appState';

export const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;