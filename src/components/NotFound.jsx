import { Box, styled } from '@mui/material';
import React from 'react';
import PageNotFoundImage from '../../public/images/page_not_found.svg';

const StyledImage = styled('img')(() => ({
  maxWidth: '800px',
  width: '100%',
}));

export default function NotFound() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledImage src={PageNotFoundImage} alt="page not found image" />
    </Box>
  );
}
