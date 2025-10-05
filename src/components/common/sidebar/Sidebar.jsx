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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <img
                  src="/medIntegralLogo.png"
                  alt="Logo MedIntegral"
                  style={{ height: '4.2rem' }}
                />
                <Typography
                  sx={{
                    color: '#00AEEF',
                    margin: 0,
                    fontSize: '1.4rem',
                    fontWeight: '500',
                  }}
                >
                  Med
                  <span style={{ color: '#FFFFFF' }}>Integral</span>
                </Typography>
              </Box>
              {esMobile ? (
                <IconButton onClick={toggleDrawer}>
                  <CloseIcon sx={{ color: '#ffffffff' }} />
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
              }}
            >
              <img
                src="/medIntegralLogo.png"
                alt="Logo MedIntegral"
                style={{ height: '4.2rem' }}
              />
            </Box>
          )}
        </ListItemButton>
      </Toolbar>

      <List sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1301,
            bgcolor: '#0b111e',
            width: '100%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src="/medIntegralLogo.png"
              alt="Logo MedIntegral"
              style={{ height: '4.2rem' }}
            />
            <Typography
              sx={{
                color: '#00AEEF',
                fontSize: '1.4rem',
                fontWeight: '500',
              }}
            >
              Med<span style={{ color: '#FFFFFF' }}>Integral</span>
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <KeyboardDoubleArrowRightOutlinedIcon sx={{ color: '#FFFFFF' }} />
          </IconButton>
        </Box>
      )}

      <Drawer
        variant={esMobile ? 'temporary' : 'permanent'}
        open={esMobile ? openDrawer : open}
        sx={{
          zIndex: 1302,
          width: esMobile ? drawerWidth : open ? drawerWidth : 100,
          flexShrink: 0,
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: esMobile ? drawerWidth : open ? drawerWidth : 100,
            boxSizing: 'border-box',
            backgroundColor: '#0b111e',
            color: '#fff',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            borderRight: 'none',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
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
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            minWidth: 190,
            paddingY: 0.6,
          },
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            component={RouterLink}
            to={item.route}
            onClick={cerrarMenu}
            sx={{
              '&:hover': { backgroundColor: '#3D4B6B' },
              borderRadius: '8px',
              mx: '8px',
              my: '4px',
              gap: '0.8rem',
              px: '12px',
              py: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: '32px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
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
