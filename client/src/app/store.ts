import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import keyboardReducer from '../features/keyboard/keyboardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    keyboard: keyboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
