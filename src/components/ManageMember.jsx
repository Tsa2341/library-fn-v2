import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { format, isAfter, isBefore } from 'date-fns';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import Header from './Header';
import MemberShipStatusModal from './MemberShipStatusModal';
import { Chart } from 'react-google-charts';
import generateChartData from '../helpers/createChartData';
import BackButton from './BackButton';

const Title = ({ children, sx, ...props }) => {
  const {
    palette: { color },
  } = useTheme();

  return (
    <Typography
      fontSize="1.5rem"
      my="15px"
      sx={{
        borderBottom: `1px solid ${color.grey}`,
        display: 'inline-block',
        ...sx,
      }}
      {...props}
    >
      {children}:
    </Typography>
  );
};

function ManageMember() {
  const { members } = useSelector((state) => state.allMembers);
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(undefined);

  id = parseInt(id, 10);

  const member = members.filter((member) => member.id === id)[0];

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
  const data = generateChartData(members[0].check_out_members);

  return (
    <>
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
        <Header sx={{ marginBottom: '30px' }}>
          {capitalizeFirstLetter(member.name)}
        </Header>

        <Chart
          chartType="Bar"
          data={data}
          width="100%"
          height="300px"
          options={{
            chart: {
              title: `${capitalizeFirstLetter(member.name)} Check-Out graph`,
              subtitle: 'Number of check-outs per month',
            },
            backgroundColor: 'lightblue',
          }}
        />

        {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,Presonal data ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
        <Title>Personal Data</Title>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <Typography>
              First name: {capitalizeFirstLetter(member.name).split(' ')[0]}
            </Typography>
            <Typography>
              Last name: {capitalizeFirstLetter(member.name).split(' ')[1]}
            </Typography>
            <Typography>Username: {member.userName}</Typography>
          </Stack>
          <Stack>
            <Typography>Email: {member.email}</Typography>
            <Typography>Phone: {member.phone}</Typography>
          </Stack>
        </Box>
        <Title>Membership Details</Title>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <Typography>Library Card: {member.card.card_number}</Typography>
            <Typography>Status: {member.card.status}</Typography>
          </Stack>
          <Stack>
            <Typography>
              Membership creation date:{'  '}
              {format(new Date(member.card.creation_date), 'yyyy-M-d')}
            </Typography>
            <Typography>
              Membership due date:{'  '}
              {format(new Date(member.card.due_date), 'yyyy-M-d')}
            </Typography>
          </Stack>
        </Box>
        {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,books data ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
        <Title>Books Data</Title>
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
              Membership Status:
            </Typography>
            <Typography>{member.card.status}</Typography>
            {member.card.status === 'active' ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setStatus('canceled');
                  setOpen(true);
                }}
              >
                <Typography fontSize="0.7rem" color="white">
                  Cancel
                </Typography>
              </Button>
            ) : (
              <Button variant="contained" color="error">
                <Typography
                  fontSize="0.7rem"
                  color="white"
                  onClick={() => {
                    setStatus('active');
                    setOpen(true);
                  }}
                >
                  Activate
                </Typography>
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
      <MemberShipStatusModal
        open={open}
        setOpen={setOpen}
        member={member}
        status={status}
      />
    </>
  );
}

export default ManageMember;
