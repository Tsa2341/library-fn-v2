import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import { fetchMember } from '../helpers/redux.helper';

function Member() {
  const dispatch = useDispatch();
  const { loadingGet } = useSelector((state) => state.member);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchMember(dispatch);
    }
  }, []);

  return token && loadingGet ? <LoadingPage /> : <Outlet />;
}

export default Member;
