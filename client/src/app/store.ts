import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { logsReducer } from './modules/Log/List/state';

export const store = configureStore({
  reducer: {
    logs: logsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
