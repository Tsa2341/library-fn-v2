import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/NavBar';

function App() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          width: '100%',
          height: '100%',
        }}
      >
        <NavBar />
        <Container maxWidth="xl" style={{ padding: 0, height: '100%' }}>
          <Outlet />
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
}

export default App;
