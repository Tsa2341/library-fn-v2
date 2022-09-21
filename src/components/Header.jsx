import { Typography, useTheme } from '@mui/material';
import React from 'react';

function Header({ children, ...props }) {
  const {
    palette: { color },
  } = useTheme();

  return (
    <Typography
      fontSize="1.5rem"
      fontWeight="bold"
      borderBottom={`1px solid ${color.grey}`}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Header;
