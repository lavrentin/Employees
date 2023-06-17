import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import employeesReducer from '../reducers/employeesReducer';
import tasksSlice from '../reducers/tasksSlice';

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    tasks: tasksSlice,
  },
  middleware,
});
