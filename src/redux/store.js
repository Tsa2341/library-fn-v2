import { configureStore } from '@reduxjs/toolkit';
import addBookReducer from './slices/addBook.slice';
import allBooksReducer from './slices/allBooks.slice';
import allMembersReducer from './slices/allMembers.slice';
import memberReducer from './slices/member.slice';
import oneBookReducer from './slices/oneBook.slice';

export default configureStore({
  reducer: {
    member: memberReducer,
    allMembers: allMembersReducer,
    allBooks: allBooksReducer,
    oneBook: oneBookReducer,
    addBook: addBookReducer,
  },
});
