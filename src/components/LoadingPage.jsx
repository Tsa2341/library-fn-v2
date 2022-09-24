import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingPage = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...props}
    >
      <CircularProgress thickness={5} size="7rem" color="secondary" />
    </Box>
  );
};

export default LoadingPage;
