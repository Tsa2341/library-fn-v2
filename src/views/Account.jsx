import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchMember } from '../helpers/redux.helper';

function Account() {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.member);

  useEffect(() => {
    fetchMember(dispatch);
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
