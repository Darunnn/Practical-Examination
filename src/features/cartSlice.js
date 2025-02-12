
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
        const { id } = action.payload; 
        state.cart = state.cart.filter(item => item.id !== id);
      },
    increaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
