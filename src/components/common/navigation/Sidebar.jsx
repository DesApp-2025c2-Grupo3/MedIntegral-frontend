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
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { sidebarItems } from '../../../utils/sidebarItems';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import BrandLogo from '../BrandLogo';
import './Sidebar.css';

const drawerWidth = 280;

export default function Sidebar({ open, toggleOpen }) {
  const [anclaMenu, setAnclaMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();

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
            justifyContent: open ? 'space-between' : 'center',
            px: 1,
          }}
        >
          {open && <BrandLogo clickable={false} size="small" />}
          <KeyboardDoubleArrowLeftOutlinedIcon
            onClick={toggleOpen}
            sx={{
              fontSize: '2rem',
              cursor: 'pointer',
              transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </Toolbar>

        <List className="sidebar-list">
          <ListItemButton
            className={!open ? 'sidebar-collapsed' : ''}
            component={RouterLink}
            to="/"
            selected={location.pathname === '/'}
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
              esMobile={false}
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
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
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
            <ListItemIcon sx={{ color: '#fff' }}>{<item.icon />}</ListItemIcon>
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
