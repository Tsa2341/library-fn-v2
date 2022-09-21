import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  loadingGet: true,
  error: null,
};

const allMembersSlice = createSlice({
  name: 'allMembers',
  initialState,
  reducers: {
    getAllMembers: (state, { payload }) => {
      return { ...state, members: payload, loadingGet: false };
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
  loadingGet: loadingGetAllMembersAction,
  getAllMembers: getAllMembersAction,
  error: allMembersErrorAction,
} = allMembersSlice.actions;

export default allMembersSlice.reducer;
