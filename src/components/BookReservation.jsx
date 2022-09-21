import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
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
import Header from './Header';
import LoadingButton from './LoadingButton';
import ReservationModal from './ReservationModal';

function BookReservation() {
  const { books } = useSelector((state) => state.oneBook);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reservationNumber, setReservationNumber] = useState('');

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

  async function reserveBook() {
    await axiosInstance
      .post(`/books/reserve/${id}`, {})
      .then((res) => {
        getOneBookData();
        setReservationNumber(res.data.data.bookReservation.reservation_num);
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
        <Header sx={{ marginBottom: '20px' }}>Book Reservation</Header>

        <Typography mb="20px">
          {capitalizeFirstLetter(userData.name)}:{' '}
        </Typography>
        <Typography>
          Picked book:
          {book.title}
        </Typography>
        <Typography>
          Reservation date:
          {format(new Date(), 'd-M-yyyy')}
        </Typography>
        <LoadingButton
          loading={loading}
          color="primary"
          sx={{ mx: 'auto', maxWidth: '300px', my: '20px' }}
          onClick={() => {
            reserveBook();
            setLoading(true);
          }}
        >
          <Typography color="white">Confirm Reservation</Typography>
        </LoadingButton>
      </Box>
      <ReservationModal
        open={open}
        setOpen={setOpen}
        successfull={success}
        errorMessage={errorMessage}
        reservationNumber={reservationNumber}
      />
    </>
  );
}

export default BookReservation;
