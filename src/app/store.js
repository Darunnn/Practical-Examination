import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import paginationReducer from "../features/paginationSlice";
import productReducer from "../features/productSlice";
import chatReducer from "../features/chatSlice"; 
import authReducer from '../features/authSlice';
import cartReducer from "../features/cartSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    pagination: paginationReducer,
    products: productReducer,
    chat: chatReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
