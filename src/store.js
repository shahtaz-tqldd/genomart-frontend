import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./feature/api/apiSlice";
import authReducer from "./feature/auth/authSlice";
import cartReducer from "./feature/cart/cartSlice";
import autModalReducer from "./feature/auth/authModalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    authModal: autModalReducer,
  },
  devTools: import.meta.env.VITE_ENV !== "PRODUCTION",
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
