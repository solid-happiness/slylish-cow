import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favorites from 'client/slices/favorites';

export const store = configureStore({
  reducer: combineReducers({
    favorites,
  }),
});
