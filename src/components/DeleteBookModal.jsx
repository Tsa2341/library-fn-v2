import { Box, Modal, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import LoadingButton from './LoadingButton';

function DeleteBookModal({ open, setOpen, book, sx, ...props }) {
  const [loading, setLoading] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  const navigate = useNavigate();

  async function deleteBook() {
    setLoading(true);
    await axiosInstance
      .delete(`/books/${book.id}`)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/catalog/search');
      })
      .catch((error) => {
        toast.error(formatAxiosError(error));
        handleClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      open={open}
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
          backgroundColor: '#FFCBCB',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box sx={{ width: '100%', padding: '60px', pt: '80px' }}>
          <Typography
            fontSize={{ xs: '1.5rem', md: '2rem' }}
            textAlign="center"
          >
            Confirm delete of &quot;{book.title}&quot;
          </Typography>
        </Box>
        <Stack
          direction="row"
          padding="10px 20px"
          justifyContent="space-around"
          gap="20px"
        >
          <LoadingButton
            color="secondary"
            sx={{ maxWidth: '100px' }}
            onClick={() => {
              deleteBook();
            }}
            loading={loading}
          >
            <Typography color="white">Yes</Typography>
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="customWhite"
            sx={{ maxWidth: '100px', width: '100%' }}
            onClick={() => {
              handleClose();
            }}
            disabled={loading}
          >
            <Typography>No</Typography>
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DeleteBookModal;
