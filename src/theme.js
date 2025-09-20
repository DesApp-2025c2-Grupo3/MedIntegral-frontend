import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    color: '#9B9B9B',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#00AEEF',
      dark: '#0077C8',
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
      hover: '#29B6F6',
      selected: '#0077C8',
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
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1rem',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1rem',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiBreadcrumbs-root, &.MuiBreadcrumbs-li': {
            fontWeight: 700,
            fontSize: '1rem',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          '&.Mui-focused': {
            fontWeight: 600,
          },
          '&.MuiInputLabel-shrink': {
            fontWeight: 600,
            fontSize: '1.15rem',
            backgroundColor: '#FFFFFF',
            padding: '0 8px',
          },
          '&.Mui-disabled': {
            color: '#9e9e9e',
            transition: 'color 0.3s ease',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: 8,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.05)',
          transition: 'background-color 0.3s ease, opacity 0.3s ease',
          '&.Mui-disabled': {
            backgroundColor: '#f5f5f5',
            opacity: 1,
          },
        },
        input: {
          transition: 'color 0.3s ease, -webkit-text-fill-color 0.3s ease',
          '&.Mui-disabled': {
            WebkitTextFillColor: '#9e9e9e',
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
        },
        popupIndicator: {
          fontSize: '1.5rem',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#9B9B9B',
      },
    },
  },
});

export default theme;
