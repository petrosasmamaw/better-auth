"use client";
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import authReducer from './authSlice';
import chatsReducer from './chatsSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
    chats: chatsReducer,
    ui: uiReducer,
  },
});

export default store;
