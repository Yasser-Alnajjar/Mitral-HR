import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
