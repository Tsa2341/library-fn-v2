import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: {},
  loadingGet: false,
  error: null,
};

const oneBookSlice = createSlice({
  name: 'oneBook',
  initialState,
  reducers: {
    getOneBook: (state, { payload }) => {
      return {
        ...state,
        books: { ...state.books, [payload.id]: payload },
        loadingGet: false,
      };
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
  loadingGet: loadingGetOneBookAction,
  getOneBook: getOneBookAction,
  error: oneBookErrorAction,
} = oneBookSlice.actions;

export default oneBookSlice.reducer;
