import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchAllMembers } from '../helpers/redux.helper';

function ManageMembership() {
  const dispatch = useDispatch();
  const { loadingGet } = useSelector((state) => state.allMembers);

  useEffect(() => {
    fetchAllMembers(dispatch);
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
