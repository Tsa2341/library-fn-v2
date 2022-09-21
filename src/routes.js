import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import About from './components/About';
import AccountDetails from './components/AccountDetails';
import AddBook from './components/AddBook';
import BookCheckOut from './components/BookCheckOut';
import BookDetails from './components/BookDetails';
import BookReservation from './components/BookReservation';
import CategoryBook from './components/CategoryBook';
import ExtendDeadline from './components/ExtendDeadline';
import Logout from './components/Logout';
import ManageBook from './components/ManageBook';
import ManageMember from './components/ManageMember';
import MemberShipSearch from './components/MemberShipSearch';
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
          { path: 'register', element: <RegisterMember /> },
          { path: 'signIn', element: <SignInMember /> },
          { path: 'payment', element: <Payment /> },
        ],
      },
      {
        path: 'librarian',
        element: <Librarian />,
        children: [
          { path: 'signIn', element: <SignInLibrarian /> },
          {
            path: 'manage',
            element: <ManageMembership />,
            children: [
              { path: '', element: <Navigate to="search" /> },
              { path: 'search', element: <MemberShipSearch /> },
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
