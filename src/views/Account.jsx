import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import {
  getMemberAction,
  loadingGetMemberAction,
  memberErrorAction,
} from '../redux/slices/member.slice';

function Account() {
  const type = JSON.parse(localStorage.getItem('type'));
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(loadingGetMemberAction());
    axiosInstance
      .get(type === 'member' ? '/users/members' : '/users/librarians')
      .then((res) => {
        let data;
        if (type === 'member') {
          data = res.data.data.member;
        } else {
          data = res.data.data.librarian;
        }
        dispatch(getMemberAction(data));
      })
      .catch((error) => {
        dispatch(memberErrorAction(formatAxiosError(error)));
        toast.error(formatAxiosError(error));
      });
  }, []);

  return Object.keys(member).length === 0 ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress thickness={5} size="7rem" color="secondary" />
    </Box>
  ) : (
    <Outlet />
  );
}

export default Account;
