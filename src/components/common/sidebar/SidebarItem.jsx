import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
  List,
} from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Link as RouterLink } from 'react-router-dom';

export default function SidebarItem({
  item,
  open,
  esMobile,
  abrirMenu,
  collapsed,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => setIsOpen(!isOpen);

  const handleClick = (e) => {
    if (item.children) {
      const pantallaExpandida = open || esMobile;
      if (pantallaExpandida) {
        toggleItem();
      } else {
        abrirMenu(e, item.children);
      }
    }
  };

  return (
    <Box>
      <Tooltip title={!open ? item.label : ''} placement="right">
        <ListItemButton
          className={collapsed ? 'sidebar-collapsed' : ''}
          onClick={handleClick}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          {(open || esMobile) && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '1.1rem' }}
            />
          )}

          {(open || esMobile) &&
            item.children &&
            (isOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />)}
        </ListItemButton>
      </Tooltip>

      {(open || esMobile) && item.children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, i) => (
              <ListItemButton
                key={i}
                component={RouterLink}
                to={child.route}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText primary={child.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        icon: PropTypes.node,
        route: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  open: PropTypes.bool.isRequired,
  esMobile: PropTypes.bool.isRequired,
  abrirMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
};
