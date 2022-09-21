import { Box, Typography } from '@mui/material';
import { add, format } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import {
  getOneBookAction,
  loadingGetOneBookAction,
  oneBookErrorAction,
} from '../redux/slices/oneBook.slice';
import BackButton from './BackButton';
import CheckOutModal from './CheckOutModal';
import Header from './Header';
import LoadingButton from './LoadingButton';

function BookCheckOut() {
  const { books } = useSelector((state) => state.oneBook);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkOutNumber, setCheckOutNumber] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));

  const book = books[id];

  async function getOneBookData() {
    dispatch(loadingGetOneBookAction());
    axiosInstance
      .get(`/books/${id}`)
      .then((res) => {
        dispatch(getOneBookAction(res.data.data.book));
        setSuccess(true);
      })
      .catch((error) => {
        dispatch(oneBookErrorAction(formatAxiosError(error)));
        setErrorMessage(formatAxiosError(error));
      });
  }

  async function checkOut() {
    await axiosInstance
      .post(`/books/check-out/${id}`, {})
      .then((res) => {
        getOneBookData();
        setCheckOutNumber(res.data.data.bookCheckOut.check_out_num);
      })
      .catch((error) => {
        setErrorMessage(formatAxiosError(error));
      })
      .finally(() => {
        setOpen(true);
        setLoading(false);
      });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          width: '100%',
          py: { xs: '20px', sm: '30px' },
          px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
        }}
      >
        <BackButton
          sx={{
            marginLeft: '-30px',
          }}
        >
          <Typography fontSize="1rem">Back</Typography>
        </BackButton>
        <Header sx={{ marginBottom: '20px' }}>Book Check-out</Header>

        <Typography mb="20px">
          {capitalizeFirstLetter(userData.name)}:{' '}
        </Typography>
        <Typography>
          Picked book:
          {book.title}
        </Typography>
        <Typography>
          Check-out date:
          {format(new Date(), 'd-M-yyyy')}
        </Typography>
        <Typography>
          Deadline to return:
          {format(add(new Date(), { days: 4 }), 'd-M-yyyy')}
        </Typography>
        <Typography>Recieve at: Kazakh National Library</Typography>
        <LoadingButton
          loading={loading}
          color="primary"
          sx={{ mx: 'auto', maxWidth: '300px', my: '20px' }}
          onClick={() => {
            checkOut();
            setLoading(true);
          }}
        >
          <Typography color="white">Confirm Check-Out</Typography>
        </LoadingButton>
      </Box>
      <CheckOutModal
        open={open}
        setOpen={setOpen}
        successfull={success}
        errorMessage={errorMessage}
        checkOutNumber={checkOutNumber}
      />
    </>
  );
}

export default BookCheckOut;
