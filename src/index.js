import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store';
import routes from './routes';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    color: {
      grey: '#797979',
      faintBlack: '#8C8C8C',
      modalBg: '#DEFFE5',
    },
    common: { black: '#333333', white: '#FFFFFF' },
    primary: {
      main: '#00B123',
      text: '#fff',
    },
    secondary: {
      main: '#169BD5',
      text: '#fff',
    },
    customWhite: createColor('#fff'),
    error: {
      main: '#B10007',
      text: '#fff',
    },
    success: {
      main: '#00B123',
      text: '#fff',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    allVariants: {
      color: '#333333',
      wordBreak: 'break-word',
    },
    margin: 0,
    '@media (max-width:600px)': {
      fontSize: 14,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </ThemeProvider>,
);
