import { configureStore } from '@reduxjs/toolkit';
import TodoListSlice from 'redux/slices/todoList';

export const store = configureStore({
	reducer: {
		todoList: TodoListSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
