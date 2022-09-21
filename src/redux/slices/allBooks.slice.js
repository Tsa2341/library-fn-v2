import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loadingGet: false,
  error: null,
};

const allBooksSlice = createSlice({
  name: 'allBooks',
  initialState,
  reducers: {
    getAllBooks: (state, { payload }) => {
      return { ...state, books: payload, loadingGet: false };
    },
    loadingGet: (state, _) => {
      return { ...state, loadingGet: true };
    },
    error: (state, { payload }) => {
      return { ...state, loadingGet: false, error: payload };
    },
  },
});

export const {
  loadingGet: loadingGetAllBooksAction,
  getAllBooks: getAllBooksAction,
  error: allBooksErrorAction,
} = allBooksSlice.actions;

export default allBooksSlice.reducer;
