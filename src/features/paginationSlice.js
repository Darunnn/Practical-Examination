import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: parseInt(localStorage.getItem('currentPage')) || 1,
  itemsPerPage: 10,
  data: [],
  totalItems: 0,
  loading: false,
  error: '',
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      localStorage.setItem('currentPage', action.payload); 
    },
    setPaginationData: (state, action) => {
      state.data = action.payload.data;
      state.totalItems = action.payload.total;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPage, setPaginationData, setLoading, setError } = paginationSlice.actions;
export default paginationSlice.reducer;
