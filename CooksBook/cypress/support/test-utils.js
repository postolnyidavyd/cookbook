import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../../src/store/api/apiSlice.js';
import authReducer from '../../src/store/authSlice.js';
import uiReducer from '../../src/store/uiSlice.js';
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Встановлюємо початковий стан
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};
