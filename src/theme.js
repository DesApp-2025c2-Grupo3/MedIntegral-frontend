import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    color: '#9B9B9B',
    subtitle1: {
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontSize: '1.15rem',
    },
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
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.05)',
          borderRadius: 8,
        },
        icon: {
          fontSize: '1.5rem',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.05)',
          borderRadius: 8,
        },
        icon: {
          fontSize: '1.5rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.05)',
          borderRadius: 8,
        },
        inputAdornedEnd: {
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem',
          },
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
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: '#00AEEF',
          color: '#fff',
        },
        '&.Mui-selected': {
          backgroundColor: '#00AEEF',
          color: '#fff',
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#00AEEF',
          color: '#fff',
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
