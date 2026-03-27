"use client";
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
  },
});

export default store;
