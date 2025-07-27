// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import urlReducer from './urlSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
});

export default store;


