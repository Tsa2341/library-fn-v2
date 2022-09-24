import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LogoText = styled(Typography)(({ theme }) => ({
  lineHeight: '1rem',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));
const LinkText = ({ children, to, color = 'primary', onClick }) => {
  return (
    <NavLink to={to} onClick={onClick ? onClick : undefined}>
      {({ isActive }) => (
        <Typography
          style={
            isActive
              ? {
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                }
              : undefined
          }
          color={color}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

function NavBar() {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:706px)');
  const [openDrawer, setOpenDrawer] = useState(false);

  const token = localStorage.getItem('token');

  let links = [];

  if (!token) {
    links = [
      { to: '/member/signIn', text: 'Sign In' },
      { to: '/member/register', text: 'Registration' },
      { to: '/librarian/signIn', text: 'Librarian SignIn' },
      ...links,
    ];
  }

  if (token) {
    links = [
      { to: '/account', text: 'Account' },
      { to: '/logout', text: 'Logout' },
      ...links,
    ];

    const type = JSON.parse(localStorage.getItem('type'));
    if (type === 'librarian') {
      links = [
        { to: '/librarian/manage', text: 'Manage Membership' },
        { to: '/analytics', text: 'Library Analytics' },
        ...links,
      ];
    }
    if (type === 'member') {
      links = [
        { to: '/member/manage-books', text: 'Manage My Books' },
        ...links,
      ];
    }
  }

  links = [
    { to: '/about', text: 'About' },
    { to: '/catalog', text: 'Catalog' },
    ...links,
  ];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 'max-content',
          bgcolor: 'white',
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 40px',
          border: `1px solid ${theme.palette.color.grey}`,
        }}
      >
        <Stack direction="column" sx={{ transition: 'all 1s ease-in-out' }}>
          <LogoText>Kazakh</LogoText>
          <LogoText>National</LogoText>
          <LogoText>Library</LogoText>
        </Stack>
        {!matches ? (
          <Stack
            direction="row"
            spacing="15px"
            sx={{ transition: 'all 1s ease-in-out' }}
          >
            {links.map(({ to, text }) => (
              <LinkText to={to} key={to}>
                {text}
              </LinkText>
            ))}
          </Stack>
        ) : (
          <IconButton
            onClick={() => {
              setOpenDrawer(true);
            }}
            sx={{ transition: 'all 1s ease-in-out' }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          padding: '50px',
          height: '100%',
          position: 'fixed',
          zIndex: '100',
          bgcolor: theme.palette.primary.dark,
          right: 0,
          top: 0,
          display: openDrawer ? 'box' : 'none',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          <CloseIcon color="customWhite" />
        </IconButton>
        {links.map(({ to, text }) => (
          <LinkText
            key={to}
            to={to}
            color="white"
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            {text}
          </LinkText>
        ))}
      </Box>
    </>
  );
}

export default NavBar;
