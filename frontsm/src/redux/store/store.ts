// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '@/redux/slices/itemSlice';
import registerReducer from '@/redux/slices/registerSlice';
import userReducer from '@/redux/slices/userSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    register: registerReducer,
    user: userReducer
  },
});

// Tipos del store y dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
