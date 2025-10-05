import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  AppBar,
  CssBaseline,
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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './Sidebar.css';

const drawerWidth = 350;

export default function Sidebar() {
  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anclaMenu, setAnclaMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const toggleDrawer = () => {
    if (esMobile) setOpenDrawer(!openDrawer);
    else setOpen(!open);
  };

  const abrirMenu = (e, items) => {
    if (!open && !esMobile) {
      setAnclaMenu(e.currentTarget);
      setMenuItems(items);
    }
  };

  const cerrarMenu = () => {
    setAnclaMenu(null);
    setMenuItems([]);
  };

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

  const drawerWidthActual =
    esMobile && window.innerWidth <= 350
      ? '100%'
      : esMobile
        ? drawerWidth
        : open
          ? drawerWidth
          : 90;

  const drawerContent = (
    <>
      {esMobile && openDrawer && (
        <Toolbar>
          <Box className="sidebar-header">
            <img
              src="/medIntegralLogo.png"
              alt="Logo MedIntegral"
              className="sidebar-logo"
            />
            <Typography
              sx={{
                color: '#00AEEF',
                fontSize: '1.4rem',
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Med<span style={{ color: '#FFFFFF' }}>Integral</span>
            </Typography>
          </Box>
          {esMobile ? (
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          ) : (
            <KeyboardDoubleArrowLeftOutlinedIcon sx={{ fontSize: '2rem' }} />
          )}
        </Toolbar>
      )}

      <List className="sidebar-list">
        <ListItemButton
          className={!open && !esMobile ? 'sidebar-collapsed' : ''}
          component={RouterLink}
          to="/"
        >
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          {(open || (esMobile && openDrawer)) && (
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{ fontSize: '1.1rem' }}
            />
          )}
        </ListItemButton>

        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            open={open}
            esMobile={esMobile && openDrawer}
            abrirMenu={abrirMenu}
            collapsed={!open && !esMobile}
          />
        ))}
      </List>
    </>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#0b111e',
          color: '#fff',
          boxShadow: 'none',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleDrawer} color="inherit">
              {openDrawer ? <CloseIcon /> : <MenuIcon />}
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
      <Drawer
        variant={esMobile ? 'temporary' : 'permanent'}
        open={esMobile ? openDrawer : open}
        sx={{
          width: drawerWidthActual,
          flexShrink: 0,
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidthActual,
            backgroundColor: '#0b111e',
            color: '#fff',
            borderRight: 'none',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      <Menu
        anchorEl={anclaMenu}
        open={Boolean(anclaMenu)}
        onClose={cerrarMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            component={RouterLink}
            to={item.route}
            onClick={cerrarMenu}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '1rem',
                fontWeight: 500,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
