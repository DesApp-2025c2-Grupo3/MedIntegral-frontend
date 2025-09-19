import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    color: '#9B9B9B',
  },
  palette: {
    primary: {
      main: '#00AEEF',
      dark: '#0A0F1C',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#9B9B9B',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    secondary: {
      main: '#FF9800',
    },
    action: {
      hover: '#1976D2',
      selected: '#37474F',
      disabledBackground: '#E0E0E0',
    },

    divider: '#B0BEC5',
    info: {
      main: '#29B6F6',
    },

    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFEB3B',
    },
    error: {
      main: '#F44336',
      dark: '#C62828',
    },
  },
});

export default theme;
