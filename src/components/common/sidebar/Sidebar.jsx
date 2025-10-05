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
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
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
    if (esMobile) {
      setOpenDrawer(!openDrawer);
    } else {
      setOpen(!open);
    }
  };

  const abrirMenu = (e, items) => {
    setAnclaMenu(e.currentTarget);
    setMenuItems(items);
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

  const drawerContent = (
    <>
      <Toolbar>
        <ListItemButton
          onClick={toggleDrawer}
          sx={{
            mt: '1rem',
            mb: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            padding: 0,
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          {open || (esMobile && openDrawer) ? (
            <>
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
                <KeyboardDoubleArrowLeftOutlinedIcon
                  sx={{ fontSize: '2rem' }}
                />
              )}
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <img
                src="/medIntegralLogo.png"
                alt="Logo MedIntegral"
                className="sidebar-logo"
              />
            </Box>
          )}
        </ListItemButton>
      </Toolbar>

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
      {esMobile && (
        <Box className="sidebar-mobile-header">
          <Box className="sidebar-header">
            <img
              src="/medIntegralLogo.png"
              alt="Logo MedIntegral"
              className="sidebar-logo"
            />
            <Typography
              sx={{ color: '#00AEEF', fontSize: '1.4rem', fontWeight: 500 }}
            >
              Med<span style={{ color: '#FFFFFF' }}>Integral</span>
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer}>
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
        </Box>
      )}

      <Drawer
        variant={esMobile ? 'temporary' : 'permanent'}
        open={esMobile ? openDrawer : open}
        sx={{
          width: esMobile ? drawerWidth : open ? drawerWidth : 90,
          flexShrink: 0,
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: esMobile ? drawerWidth : open ? drawerWidth : 90,
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
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
              primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
