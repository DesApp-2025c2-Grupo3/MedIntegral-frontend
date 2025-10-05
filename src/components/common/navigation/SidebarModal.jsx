import {
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SidebarModal({ open, onClose }) {
  const items = [
    { label: 'Dashboard', icon: <ShowChartIcon />, route: '/' },
    {
      label: 'Afiliados',
      icon: <PersonOutlinedIcon />,
      route: '/afiliados/listado',
    },
    {
      label: 'Prestadores',
      icon: <MedicalInformationOutlinedIcon />,
      route: '/prestadores/listado',
    },
    {
      label: 'Agenda de turnos',
      icon: <CalendarTodayOutlinedIcon />,
      route: '/agenda-turnos',
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 300,
          backgroundColor: '#0b111e',
          color: '#fff',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <img src="/medIntegralLogo.png" alt="Logo" className="sidebar-logo" />
          <Typography sx={{ color: '#00AEEF', fontWeight: 500 }}>
            Med<span style={{ color: '#FFF' }}>Integral</span>
          </Typography>
        </Stack>

        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <List>
        {items.map(({ label, icon, route }, idx) => (
          <ListItemButton
            key={idx}
            component={RouterLink}
            to={route}
            onClick={onClose}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

SidebarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
