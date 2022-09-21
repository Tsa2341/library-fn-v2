import { Box, Button, styled, Typography, useTheme } from '@mui/material';
import React from 'react';

const CustomTypography = styled(Typography)(() => ({
  textAlign: 'center',
  lineHeight: '1.3rem',
}));

function Logout() {
  const {
    palette: { color },
  } = useTheme();

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/member/signIn';
  }

  return (
    <Box
      sx={{
        backgroundImage: `url('/images/member_sign_bg.png')`,
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
        backgroundBlendMode: 'overlay',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: '40px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'Center',
          gap: '10px',
          bgcolor: 'white',
          margin: '10px',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <CustomTypography variant="h3" fontWeight="bold" fontSize="1.5rem">
          Logout
        </CustomTypography>
        <CustomTypography color={color.grey}>
          Farewell
          <br />
          Click the button below to logout from Kazakh National Library!
        </CustomTypography>
        <Button
          color="secondary"
          variant="contained"
          sx={{ maxWidth: '150px', width: '100%', mt: '30px' }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Logout;
