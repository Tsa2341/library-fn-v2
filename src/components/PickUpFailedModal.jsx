import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PickUpFailedModal({ open, setOpen, sx, ...props }) {
  const {
    palette: { color },
  } = useTheme();
  function handleClose() {
    setOpen(false);
  }
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          margin: '15px',
          position: 'relative',
          backgroundColor: color.modalBg,
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding="10px 30px"
        >
          <Typography color={color.faintBlack} fontSize="1.5rem">
            Oh, no!
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Box
          sx={{ width: '100%', padding: '36px', border: '1px solid #D7D7D7' }}
        >
          <Typography
            fontSize={{ xs: '1.5rem', md: '2rem' }}
            textAlign="center"
          >
            To see detailed information about the book you need to be a
          </Typography>
          <Typography
            fontSize={{ xs: '1.5rem', md: '2rem' }}
            fontWeight="bold"
            textAlign="center"
          >
            Member
          </Typography>
        </Box>
        <Stack
          direction="row"
          padding="10px 20px"
          justifyContent="space-around"
          gap="20px"
        >
          <Button
            variant="contained"
            color="customWhite"
            sx={{ maxWidth: '150px', width: '100%' }}
            onClick={() => {
              navigate('/member/register');
            }}
          >
            Registration
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxWidth: '150px', width: '100%' }}
            onClick={() => {
              navigate('/member/signIn');
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default PickUpFailedModal;
