import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import About from './components/About';
import AccountDetails from './components/AccountDetails';
import AddBook from './components/AddBook';
import Analytics from './components/Analytics';
import BookCheckOut from './components/BookCheckOut';
import BookDetails from './components/BookDetails';
import BookReservation from './components/BookReservation';
import CategoryBook from './components/CategoryBook';
import EditMember from './components/EditMember';
import ExtendDeadline from './components/ExtendDeadline';
import LibrarianRegisterMember from './components/LibrarianRegisterMember';
import Logout from './components/Logout';
import ManageBook from './components/ManageBook';
import ManageMember from './components/ManageMember';
import MemberSearch from './components/MemberSearch';
import NotFound from './components/NotFound';
import Payment from './components/Payment';
import RegisterMember from './components/RegisterMember';
import ReturnBook from './components/ReturnBook';
import Search from './components/Search';
import SignInLibrarian from './components/SignInLibrarian';
import SignInMember from './components/SignInMember';
import Account from './views/Account';
import App from './views/App';
import Book from './views/Book';
import Catalog from './views/Catalog';
import Librarian from './views/Librarian';
import ManageMembership from './views/ManageMembership';
import Member from './views/Member';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="about" />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'member',
        element: <Member />,
        children: [
          {
            path: '',
            element: <Navigate to="signIn" />,
          },
          { path: 'register', element: <RegisterMember /> },
          { path: 'signIn', element: <SignInMember /> },
          { path: 'payment', element: <Payment /> },
          {
            path: 'manage-books',
            element: <ManageBook />,
          },
          {
            path: 'extend-book/:id',
            element: <ExtendDeadline />,
          },
          {
            path: 'return-book/:id',
            element: <ReturnBook />,
          },
        ],
      },
      {
        path: 'librarian',
        element: <Librarian />,
        children: [
          {
            path: '',
            element: <Navigate to="signIn" />,
          },
          { path: 'signIn', element: <SignInLibrarian /> },
          {
            path: 'manage',
            element: <ManageMembership />,
            children: [
              { path: '', element: <Navigate to="search" /> },
              { path: 'search', element: <MemberSearch /> },
              { path: 'member/register', element: <LibrarianRegisterMember /> },
              { path: 'member/:id', element: <ManageMember /> },
            ],
          },
        ],
      },
      {
        path: 'catalog',
        element: <Catalog />,
        children: [
          { path: '', element: <Navigate to="search" /> },
          {
            path: 'search',
            element: <Search />,
          },
          {
            path: 'category',
            element: <CategoryBook />,
          },
          {
            path: 'book/:id',
            element: <Book />,
            children: [
              {
                path: '',
                element: <Navigate to="details" />,
              },
              {
                path: 'details',
                element: <BookDetails />,
              },
              {
                path: 'check-out',
                element: <BookCheckOut />,
              },
              {
                path: 'reserve',
                element: <BookReservation />,
              },
            ],
          },
          { path: 'add-book', element: <AddBook /> },
        ],
      },
      {
        path: 'account',
        element: <Account />,
        children: [
          {
            path: '',
            element: <Navigate to="details" />,
          },
          {
            path: 'details',
            element: <AccountDetails />,
          },
          {
            path: 'details/edit',
            element: <EditMember />,
          },
        ],
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
