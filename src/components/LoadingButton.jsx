import { Button, CircularProgress } from '@mui/material';
import React from 'react';

function LoadingButton({ loading, children, sx, ...props }) {
  return (
    <Button
      color="secondary"
      variant="contained"
      sx={{ maxWidth: '150px', width: '100%', ...sx }}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <CircularProgress
          size="1.5rem"
          thickness={10}
          sx={{
            '&.MuiCircularProgress-root': {
              color: 'white',
            },
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
}

export default LoadingButton;
