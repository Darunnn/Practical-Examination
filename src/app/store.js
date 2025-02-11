import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import paginationReducer from "../features/paginationSlice";
import productReducer from "../features/productSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    pagination: paginationReducer,
    products: productReducer,
  },
});
