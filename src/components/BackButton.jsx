import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { IconButton, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton({
  color = 'black',
  direction = 'row',
  fontSize = '2rem',
  children,
  ...props
}) {
  const navigate = useNavigate();

  return (
    <Stack direction={direction} alignItems="center" {...props}>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowCircleLeftIcon color={color} sx={{ fontSize: fontSize }} />
      </IconButton>
      {children}
    </Stack>
  );
}

export default BackButton;
