import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './Redux/TasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});