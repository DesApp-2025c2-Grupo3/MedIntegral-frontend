import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

const drawerWidth = 280;

export default function Sidebar({ open, toggleOpen }) {
  const [anclaMenu, setAnclaMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const sidebarItems = [
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

  const drawerWidthActual = open ? drawerWidth : 70;

  const abrirMenu = (event, items) => {
    setAnclaMenu(event.currentTarget);
    setMenuItems(items);
  };

  const cerrarMenu = () => {
    setAnclaMenu(null);
    setMenuItems([]);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidthActual,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidthActual,
            backgroundColor: '#0b111e',
            color: '#fff',
            borderRight: 'none',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 1,
          }}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon
            onClick={toggleOpen}
            sx={{ fontSize: '2rem', cursor: 'pointer' }}
          />
        </Toolbar>

        <List className="sidebar-list">
          <ListItemButton
            className={!open ? 'sidebar-collapsed' : ''}
            component={RouterLink}
            to="/"
          >
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{ fontSize: '1.1rem' }}
              />
            )}
          </ListItemButton>

          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              open={open}
              abrirMenu={abrirMenu}
              collapsed={!open}
            />
          ))}
        </List>
      </Drawer>

      <Menu
        anchorEl={anclaMenu}
        open={Boolean(anclaMenu)}
        onClose={cerrarMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            backgroundColor: '#0b111e',
            color: '#fff',
          },
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            component={RouterLink}
            to={item.route}
            onClick={cerrarMenu}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};
