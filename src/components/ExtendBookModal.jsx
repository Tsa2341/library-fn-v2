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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMember } from '../helpers/redux.helper';

function ExtendBookModal({
  open,
  setOpen,
  successfull,
  checkOutNumber,
  errorMessage,
  newDeadline,
  sx,
  ...props
}) {
  const {
    palette: { color },
  } = useTheme();
  function handleClose() {
    setOpen(false);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
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
            {!successfull ? 'Oh, no!' : 'Yay!'}
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
            {successfull
              ? `Successful extended deadline to ${newDeadline}`
              : 'Failed to extend the book'}
          </Typography>
          {successfull ? (
            <Typography fontSize={{ xs: '1rem' }} textAlign="center">
              Check-Out number:
              <span style={{ fontWeight: 'bold' }}>{checkOutNumber}</span>
            </Typography>
          ) : (
            <Typography fontSize={{ xs: '1rem' }} textAlign="center">
              {errorMessage.toString()}
            </Typography>
          )}
        </Box>
        <Stack
          direction="row"
          padding="10px 20px"
          justifyContent="space-around"
          gap="20px"
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxWidth: '150px', width: '100%' }}
            onClick={() => {
              navigate(-1);
              fetchMember(dispatch);
            }}
          >
            <Typography color="white">Thank You</Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ExtendBookModal;
