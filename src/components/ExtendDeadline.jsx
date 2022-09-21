import { Box, Typography } from '@mui/material';
import { add, format } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import {
  getMemberAction,
  loadingGetMemberAction,
  memberErrorAction,
} from '../redux/slices/member.slice';
import BackButton from './BackButton';
import ExtendBookModal from './ExtendBookModal';
import Header from './Header';
import LoadingButton from './LoadingButton';

function ExtendDeadline() {
  const { member } = useSelector((state) => state.member);
  let { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkOutNumber, setCheckOutNumber] = useState('');

  id = parseInt(id, 10);

  const checkOut = member.check_out_members.filter((checkOut) => {
    if (!checkOut.returned_date) {
      return checkOut.check_out_books.id === id;
    }
    return false;
  })[0];

  if (!checkOut) {
    return <Navigate to="/account/manage-books" />;
  }

  const book = checkOut.check_out_books;

  const userData = JSON.parse(localStorage.getItem('userData'));

  async function getMember() {
    dispatch(loadingGetMemberAction());
    axiosInstance
      .get(`/users/members`)
      .then((res) => {
        dispatch(getMemberAction(res.data.data.member));
        setSuccess(true);
      })
      .catch((error) => {
        dispatch(memberErrorAction(formatAxiosError(error)));
        setErrorMessage(formatAxiosError(error));
      });
  }

  async function extendBook() {
    await axiosInstance
      .patch(`/books/extend/${id}`, {})
      .then((res) => {
        getMember();
        setCheckOutNumber(res.data.data.checkOut.check_out_num);
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
        <Header sx={{ marginBottom: '20px' }}>Extend Deadline</Header>

        <Typography mb="20px">
          {capitalizeFirstLetter(userData.name)}:{' '}
        </Typography>
        <Typography>
          Picked book:
          {book.title}
        </Typography>
        <Typography>
          Check-out date:
          {format(new Date(checkOut.check_out_date), 'yyyy-M-d')}
        </Typography>
        <Typography>
          Deadline to return:
          {format(new Date(checkOut.deadline), 'yyyy-M-d')}
        </Typography>
        <Typography>
          New deadline to return:
          {format(add(new Date(checkOut.deadline), { days: 4 }), 'yyyy-M-d')}
        </Typography>
        <LoadingButton
          loading={loading}
          color="primary"
          sx={{ mx: 'auto', maxWidth: '300px', my: '20px' }}
          onClick={() => {
            extendBook();
            setLoading(true);
          }}
        >
          <Typography color="white">Confirm Extend</Typography>
        </LoadingButton>
      </Box>
      <ExtendBookModal
        open={open}
        setOpen={setOpen}
        newDeadline={format(new Date(checkOut.deadline), 'yyyy-M-d')}
        successfull={success}
        errorMessage={errorMessage}
        checkOutNumber={checkOutNumber}
      />
    </>
  );
}

export default ExtendDeadline;
