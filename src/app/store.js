import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../features/people/peopleSlice';

// ----------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
