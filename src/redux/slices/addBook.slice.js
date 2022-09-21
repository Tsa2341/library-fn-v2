import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  book: null,
};

const addBookSlice = createSlice({
  name: 'addBook',
  initialState,
  reducers: {
    getAddBook: (state, { payload }) => {
      return { ...state, book: payload };
    },
    clearBook: (state, _) => {
      return { ...state, book: null };
    },
  },
});

export const { clearBook: clearBookAction, getAddBook: getAddBookaction } =
  addBookSlice.actions;

export default addBookSlice.reducer;
