import { Box, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import Header from './Header';

function AccountDetails() {
  const { member } = useSelector((state) => state.member);
  const type = JSON.parse(localStorage.getItem('type'));

  return (
    <Box
      sx={{
        py: { xs: '20px', sm: '30px' },
        px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
      }}
    >
      <Header sx={{ marginBottom: '30px' }}>Hello!</Header>
      <Typography fontSize="1.5rem" my="15px">
        Personal Data
      </Typography>
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

      {type === 'member' && (
        <>
          <Typography fontSize="1.5rem" my="15px">
            Membership Details
          </Typography>
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
          <Box sx={{ marginTop: '40px' }}>
            <Link to="../manage-books">
              <Typography
                fontWeight="bold"
                sx={{ textDecoration: 'underline' }}
              >
                Manage My Books
              </Typography>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AccountDetails;
