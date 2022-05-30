import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../components/auth/loginSlice';
import booksReducer from '../components/books/bookSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    books: booksReducer
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
