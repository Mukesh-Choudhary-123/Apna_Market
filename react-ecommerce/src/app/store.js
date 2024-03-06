import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/ProductSlice";
import authReducer from "../features/auth/AuthSlice";
import cartReducer from "../features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
