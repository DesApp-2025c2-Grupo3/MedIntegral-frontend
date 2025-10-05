import {
  Drawer,
  Toolbar,
  Typography,
  Box,
  List,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SidebarItem from './SidebarItem';
import PropTypes from 'prop-types';

export default function SidebarModal({ open, onClose }) {
  const sidebarItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <ShowChartIcon />,
      route: '/',
    },
    {
      key: 'afiliados',
      label: 'Afiliados',
      icon: <PersonOutlinedIcon />,
      children: [
        {
          label: 'Ver listado',
          icon: <FeedOutlinedIcon />,
          route: '/afiliados/listado',
        },
        {
          label: 'Agregar',
          icon: <AddOutlinedIcon />,
          route: '/afiliados/alta',
        },
      ],
    },
    {
      key: 'prestadores',
      label: 'Prestadores',
      icon: <MedicalInformationOutlinedIcon />,
      children: [
        {
          label: 'Ver listado',
          icon: <FeedOutlinedIcon />,
          route: '/prestadores/listado',
        },
        {
          label: 'Agregar',
          icon: <AddOutlinedIcon />,
          route: '/prestadores/alta',
        },
      ],
    },
    {
      key: 'agendaTurnos',
      label: 'Agenda de turnos',
      icon: <CalendarTodayOutlinedIcon />,
      children: [
        {
          label: 'Ver listado',
          icon: <FeedOutlinedIcon />,
          route: '/agenda-turnos',
        },
        {
          label: 'Agregar',
          icon: <AddOutlinedIcon />,
          route: '/agenda-turnos/alta',
        },
      ],
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        '& .MuiDrawer-paper': {
          width: 300,
          backgroundColor: '#0b111e',
          color: '#fff',
          borderRight: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src="/medIntegralLogo.png" alt="Logo" className="sidebar-logo" />
          <Typography sx={{ color: '#00AEEF', fontWeight: 500 }}>
            Med<span style={{ color: '#FFF' }}>Integral</span>
          </Typography>
        </Box>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <List className="sidebar-list">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            open={true}
            esMobile={true}
            abrirMenu={() => {}}
            collapsed={false}
          />
        ))}
      </List>
    </Drawer>
  );
}

SidebarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
