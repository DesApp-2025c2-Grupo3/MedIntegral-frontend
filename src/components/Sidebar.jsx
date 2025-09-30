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
  List,
  ListItemButton,
  Typography,
  Grid
} from '@mui/material';




const drawerWidth = 290;


export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
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
        </List>
      </Drawer>
    </>
  );
}


