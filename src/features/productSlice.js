import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  nextId: 1, 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.nextId += 1; 
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    initializeFromLocalStorage: (state) => {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      state.items = storedProducts;
      state.nextId = storedProducts.length > 0 ? Math.max(...storedProducts.map(p => p.id)) + 1 : 1;
    },
    updateNextId: (state, action) => {
      state.nextId = action.payload; 
    }
  }
});

export const { addProduct, deleteProduct, updateProduct, initializeFromLocalStorage, updateNextId } = productSlice.actions;
export default productSlice.reducer;
