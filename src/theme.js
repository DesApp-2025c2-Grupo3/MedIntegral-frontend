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
    secondary: { main: '#FF9800' },
    action: {
      hover: '#29B6F6',
      selected: '#0077C8',
      disabledBackground: '#E0E0E0',
    },
    divider: '#B0BEC5',
    info: { main: '#29B6F6' },
    success: { main: '#4CAF50' },
    warning: { main: '#FFEB3B' },
    error: { main: '#F44336', dark: '#C62828' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: '1rem' },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: '1rem' },
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
          '&.Mui-focused': { fontWeight: 600 },
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
          '&.Mui-disabled': { WebkitTextFillColor: '#9e9e9e' },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: { width: '100%' },
        popupIndicator: { fontSize: '1.5rem' },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { fontSize: '1.5rem' },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          minHeight: '3.2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          gap: '0.8rem',
          '&:hover': { backgroundColor: '#3D4B6B' },
          '&.Mui-selected': {
            backgroundColor: '#1C253C',
            '&:hover': { backgroundColor: '#2A3550' },
          },
          '&.sidebar-collapsed': {
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            gap: 0,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          minWidth: 0,
          height: '3rem',
          width: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': { fontSize: '1.9rem' },
          transition: 'all 0.3s ease',
          '.sidebar-collapsed &': {
            width: '100%',
            justifyContent: 'center',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          marginLeft: '0.3rem',
          '& .MuiTypography-root': { fontSize: '1.05rem' },
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        wrapperInner: {
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          paddingLeft: '1rem',
          paddingTop: '0.3rem',
          paddingBottom: '0.3rem',
          animation: 'fadeSlideIn 0.25s ease-out',
          '@keyframes fadeSlideIn': {
            from: { opacity: 0, transform: 'translateY(-6px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#3D4B6B',
          fontSize: '0.85rem',
          borderRadius: 6,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#9B9B9B' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0b111e',
          color: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          minWidth: 190,
          padding: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          padding: '8px 12px',
          gap: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          '&:hover': { backgroundColor: '#3D4B6B' },
        },
      },
    },
  },
});

export default theme;
