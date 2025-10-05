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

export default function SidebarItem({ item, open, esMobile, abrirMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Tooltip title={!open ? item.label : ''} placement="right">
        <ListItemButton
          sx={{
            '&:hover': { backgroundColor: '#3D4B6B' },
            borderRadius: '16px',
          }}
          onClick={(e) => {
            if (item.children) {
              const pantallaExpandida = open || esMobile;
              if (pantallaExpandida) {
                toggleItem();
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
          <List component="div" disablePadding sx={{ ml: '16px' }}>
            {item.children.map((child, i) => (
              <ListItemButton
                key={i}
                sx={{
                  pl: 4,
                  '&:hover': { backgroundColor: '#3D4B6B' },
                  borderRadius: '16px',
                  gap: '1rem',
                }}
                component={RouterLink}
                to={child.route}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 'auto' }}>
                  {child.icon}
                </ListItemIcon>
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
};
