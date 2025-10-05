import { useState, useEffect } from 'react';
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
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function SidebarItem({
  item,
  open,
  esMobile,
  abrirMenu,
  collapsed,
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isChildActive = item.children?.some((child) =>
    location.pathname.startsWith(child.route)
  );
  const isSelfActive = item.route && location.pathname === item.route;

  useEffect(() => {
    if (isChildActive) setIsOpen(true);
    else setIsOpen(false);
  }, [location.pathname]);

  const toggleItem = () => setIsOpen((prev) => !prev);

  const handleClick = (e) => {
    if (item.children) {
      const pantallaExpandida = open || esMobile;
      if (pantallaExpandida) toggleItem();
      else abrirMenu(e, item.children);
    }
  };

  const isCollapsedView = collapsed;

  return (
    <Box>
      <Tooltip title={isCollapsedView ? item.label : ''} placement="right">
        <ListItemButton
          onClick={handleClick}
          className={isCollapsedView ? 'sidebar-collapsed' : ''}
          sx={{
            borderRadius: '12px',
            marginInline: open ? '6px' : '0',
            transition: 'all 0.25s ease',
            backgroundColor:
              isCollapsedView && (isSelfActive || isChildActive)
                ? 'rgba(0,174,239,0.15)'
                : 'transparent',
            '&:hover': { backgroundColor: 'rgba(0,174,239,0.1)' },
            '& .MuiListItemIcon-root svg': {
              color:
                isSelfActive || (!open && isChildActive)
                  ? '#00AEEF'
                  : '#FFFFFF',
              transition: 'color 0.3s ease',
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          {(open || esMobile) && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '1.1rem',
                color: isSelfActive ? '#00AEEF' : '#FFFFFF',
                fontWeight: isSelfActive ? 600 : 400,
              }}
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
            {item.children.map((child, i) => {
              const active = location.pathname.startsWith(child.route);
              return (
                <ListItemButton
                  key={i}
                  component={RouterLink}
                  to={child.route}
                  selected={active}
                  sx={{
                    pl: 4,
                    borderRadius: '8px',
                    marginInline: open ? '8px' : '0',
                    transition: 'all 0.25s ease',
                    backgroundColor: active
                      ? 'rgba(0,174,239,0.15)'
                      : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(0,174,239,0.22)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? '#00AEEF' : '#FFFFFF',
                      minWidth: 36,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      color: active ? '#00AEEF' : '#FFFFFF',
                      fontWeight: active ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              );
            })}
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
    route: PropTypes.string,
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
