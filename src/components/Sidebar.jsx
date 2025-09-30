import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import {
  Drawer,
  Tooltip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';

const drawerWidth = 290;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState([]);
  const [anclaMenu, setAnclaMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleItem = (key) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const isOpen = (item) => openItems.includes(item.key);

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

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 100,
            boxSizing: 'border-box',
            backgroundColor: '#0b111e',
            color: '#fff',
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <List sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <ListItemButton
            sx={{
              mb: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              '&:hover': { backgroundColor: 'transparent' },
            }}
            onClick={toggleDrawer}
          >
            {open ? (
              <>
                <Grid
                  sx={{
                    display: 'contents',
                    alignItems: 'center',
                    gap: '3rem',
                  }}
                >
                  <img
                    src="/medIntegralLogo.png"
                    alt="Logo MedIntegral"
                    style={{ height: '4.2rem' }}
                  ></img>
                  <Typography
                    sx={{
                      color: '#00AEEF',
                      margin: 0,
                      fontSize: '1.4rem',
                      fontWeight: '500',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    Med
                    <span style={{ color: '#FFFFFF' }}>Integral</span>
                  </Typography>
                </Grid>
                <KeyboardDoubleArrowLeftOutlinedIcon />
              </>
            ) : (
              <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/medIntegralLogo.png"
                  alt='"Logo MedIntegral"'
                  style={{ height: '4.2rem' }}
                ></img>
              </Grid>
            )}
          </ListItemButton>
          {/*Dashboard*/}
          <ListItemButton
            sx={{
              '&:hover': { backgroundColor: '#3D4B6B' },
              borderRadius: '15px',
              margin: '5px',
            }}
            button
            component={RouterLink}
            to="/"
          >
            <ListItemIcon
              sx={{
                color: 'white',
                height: '3rem',
                '& svg': { fontSize: '2rem' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShowChartIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{ fontSize: '1.1rem' }}
              />
            )}
          </ListItemButton>
          {/* Elementos del menú */}
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <Tooltip title={!open ? item.label : ''} placement="right">
                <ListItemButton
                  sx={{
                    '&:hover': { backgroundColor: '#3D4B6B' },
                    borderRadius: '15px',
                    margin: '5px',
                  }}
                  onClick={(e) => {
                    if (item.children) {
                      if (open) {
                        toggleItem(item.key);
                      } else {
                        abrirMenu(e, item.children);
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'white',
                      height: '3rem',
                      '& svg': { fontSize: '2rem' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '1.1rem' }}
                    />
                  )}
                  {open &&
                    item.children &&
                    (isOpen(item) ? (
                      <ExpandLessOutlinedIcon />
                    ) : (
                      <ExpandMoreOutlinedIcon />
                    ))}
                </ListItemButton>
              </Tooltip>

              {/* Submenu (cuando esta expandida la sidebar) */}
              {open && item.children && (
                <Collapse in={isOpen(item)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ ml: '15px' }}>
                    {item.children.map((child, i) => (
                      <ListItemButton
                        key={i}
                        sx={{
                          pl: 4,
                          '&:hover': { backgroundColor: '#3D4B6B' },
                          borderRadius: '15px',
                          margin: '10px',
                        }}
                        component={RouterLink}
                        to={child.route}
                      >
                        <ListItemIcon sx={{ color: 'white' }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>

      {/*Sidebar no desplegada*/}
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
            sx={{
              '&:hover': { backgroundColor: '#3D4B6B' },
              borderRadius: '8px',
              margin: '5px',
            }}
            key={idx}
            component={RouterLink}
            to={item.route}
            onClick={cerrarMenu}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: '30px' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
