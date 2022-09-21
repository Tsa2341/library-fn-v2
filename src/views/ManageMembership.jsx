import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import {
  allMembersErrorAction,
  getAllMembersAction,
  loadingGetAllMembersAction,
} from '../redux/slices/allMembers.slice';

function ManageMembership() {
  const dispatch = useDispatch();
  const { members, loadingGet } = useSelector((state) => state.allMembers);

  useEffect(() => {
    dispatch(loadingGetAllMembersAction());
    axiosInstance
      .get('/users/members/all')
      .then((res) => {
        dispatch(getAllMembersAction(res.data.data.members));
      })
      .catch((error) => {
        dispatch(allMembersErrorAction(formatAxiosError(error)));
        toast.error(formatAxiosError(error));
      });
  }, []);

  return loadingGet ? (
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

export default ManageMembership;
