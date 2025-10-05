import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

export default function AppBarCustom({ onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0b111e',
        color: '#fff',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={onMenuClick} color="inherit">
            <MenuIcon />
          </IconButton>
          <Box className="navbar-header">
            <img
              src="/medIntegralLogo.png"
              alt="Logo MedIntegral"
              className="navbar-logo"
            />
            <Typography
              sx={{
                color: '#00AEEF',
                fontSize: '1.2rem',
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Med<span style={{ color: '#FFFFFF' }}>Integral</span>
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

AppBarCustom.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
