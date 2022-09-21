import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { format, isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFine } from '../helpers/payment.helper';
import BackButton from './BackButton';
import Header from './Header';

const CustomButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        padding: '5px 2px',
        maxWidth: '300px',
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      <Typography fontSize="0.7rem" color="white">
        {children}
      </Typography>
    </Button>
  );
};

function ManageBook() {
  const navigate = useNavigate();
  const { member } = useSelector((state) => state.member);
  const [amount, setAmount] = useState(undefined);

  const checkOutBooks = member.check_out_members.filter((checkOut) => {
    if (!checkOut.returned_date) {
      return true;
    }
    return false;
  });

  const missedDeadlines = member.check_out_members.filter((checkOut) => {
    if (checkOut.returned_date) {
      return !isBefore(
        new Date(checkOut.returned_date),
        new Date(checkOut.deadline),
      );
    }
    return false;
  });

  const reservedBooks = member.member_reservations;

  useEffect(() => {
    getFine(setAmount);
  });

  return (
    <Box
      sx={{
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
      <Header sx={{ marginBottom: '30px' }}>Manage My Books</Header>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          my: '15px',
        }}
      >
        <Stack>
          <Typography fontSize="1.5rem" mb="10px">
            Current Books
          </Typography>
          {checkOutBooks.length !== 0 ? (
            checkOutBooks.map((checkOutBook) => (
              <Box
                key={checkOutBook.check_out_num}
                sx={{ marginBottom: '15px' }}
              >
                <Typography>
                  Book title: {checkOutBook.check_out_books.title}
                </Typography>
                <Typography>
                  Check-out date:{' '}
                  {format(new Date(checkOutBook.check_out_date), 'yyy-M-d')}
                </Typography>
                <Typography>
                  Deadline to return:{' '}
                  {format(new Date(checkOutBook.deadline), 'yyy-M-d')}
                </Typography>
                <Typography>
                  Check-out number: {checkOutBook.check_out_num}
                </Typography>
                <Stack direction="row" gap="15px" pt="5px">
                  <CustomButton
                    onClick={() => {
                      navigate(
                        `../extend-book/${checkOutBook.check_out_books.id}`,
                      );
                    }}
                  >
                    Extend Deadline Date
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      navigate(
                        `../return-book/${checkOutBook.check_out_books.id}`,
                      );
                    }}
                  >
                    Return Book
                  </CustomButton>
                </Stack>
              </Box>
            ))
          ) : (
            <>
              <Typography>Book title: none</Typography>
              <Typography>Check-out date: none</Typography>
              <Typography>Deadline to return: none</Typography>
              <Typography>Check-out number: none</Typography>
            </>
          )}
        </Stack>
        <Stack>
          <Typography fontSize="1.5rem" mb="10px">
            Reserved Books
          </Typography>
          {reservedBooks.length !== 0 ? (
            reservedBooks.map((reservedBook) => (
              <Box
                key={reservedBook.reservation_num}
                sx={{ marginBottom: '15px' }}
              >
                <Typography>
                  Book title: {reservedBook.book_reservations.title}
                </Typography>
                <Typography>
                  Reservation date:{' '}
                  {format(new Date(reservedBook.createdAt), 'yyy-M-d')}
                </Typography>
                <Typography>
                  Reservation number: {reservedBook.reservation_num}
                </Typography>
              </Box>
            ))
          ) : (
            <>
              <Typography>Book title: none</Typography>
              <Typography>Reservation date: none</Typography>
              <Typography>Reservation number: none</Typography>
            </>
          )}
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          my: '15px',
        }}
      >
        <Stack>
          <Typography fontSize="1.5rem" mb="10px">
            Missed Deadlines: {missedDeadlines.length}
          </Typography>
          {missedDeadlines.length !== 0 ? (
            missedDeadlines.map((missedDeadlineBook) => (
              <Box
                key={missedDeadlineBook.check_out_num}
                sx={{ marginBottom: '15px' }}
              >
                <Typography>
                  Book title: {missedDeadlineBook.check_out_books.title}
                </Typography>
                <Typography>
                  Check-out date:{' '}
                  {format(
                    new Date(missedDeadlineBook.check_out_date),
                    'yyy-M-d',
                  )}
                </Typography>
                <Typography>
                  Return date:{' '}
                  {format(
                    new Date(missedDeadlineBook.returned_date),
                    'yyy-M-d',
                  )}
                </Typography>
                <Typography>
                  Check-out number: {missedDeadlineBook.check_out_num}
                </Typography>
              </Box>
            ))
          ) : (
            <>
              <Typography>Book title: none</Typography>
              <Typography>Check-out date: none</Typography>
              <Typography>Deadline to return: none</Typography>
              <Typography>Check-out number: none</Typography>
            </>
          )}
        </Stack>
        <Stack>
          <Typography fontSize="1.5rem" mb="10px">
            Fine:
          </Typography>
          <Typography>Fine Amount: {amount}$</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate('/member/payment');
            }}
          >
            <Typography fontSize="0.7rem" color="white">
              Pay Fine
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default ManageBook;
