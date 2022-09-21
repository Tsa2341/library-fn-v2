import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import Header from './Header';
import SearchBookInput from './SearchBookInput';

function MemberShipSearch() {
  const {
    palette: { color },
  } = useTheme();
  const navigate = useNavigate();
  const { members } = useSelector((state) => state.allMembers);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        py: { xs: '20px', sm: '30px' },
        px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
        gap: { xs: '6px', md: '10px' },
      }}
    >
      <Header mb="15px">Manage Membership</Header>
      <SearchBookInput />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {members.map((member) => (
          <Box
            key={member.id}
            sx={{
              width: '100%',
              maxWidth: '300px',
              marginX: '15px',
              border: `1px solid ${color.grey}`,
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'space-between',
              gap: '15px',
            }}
          >
            <Stack
              sx={{
                padding: '30px',
              }}
              gap="10px"
            >
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Name: {capitalizeFirstLetter(member.name)}
              </Typography>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Library card: {member.card.id}
              </Typography>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Email: {member.email}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="error"
              sx={{
                borderTop: `1px solid ${color.grey}`,
                width: '100%',
                mt: 'auto',
              }}
              onClick={() => navigate(`../member/${member.id}`)}
            >
              <Typography py="10px" color="white">
                Manage Membership
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MemberShipSearch;
