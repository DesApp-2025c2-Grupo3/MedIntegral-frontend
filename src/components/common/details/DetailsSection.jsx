import PropTypes from 'prop-types';
import { Paper, Stack, Typography, IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function DetailsSection({
  title,
  icon: TitleIcon,
  children,
  onEdit,
  editTooltip = 'Editar',
  action,
  sx,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0px 4px 15px rgba(255, 255, 255, 0.1)'
              : '0px 4px 15px rgba(0, 0, 0, 0.15)',
        },
        ...sx,
      }}
    >
      {(onEdit || action) && (
        <Stack
          direction="row"
          sx={{ position: 'absolute', top: 10, right: 10 }}
          spacing={1}
          alignItems="center"
        >
          {action}
          {onEdit && (
            <Tooltip title={editTooltip}>
              <IconButton size="small" color="primary" onClick={onEdit}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" spacing={1}>
        {TitleIcon && <TitleIcon color="primary" />}
        {title && (
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        )}
      </Stack>

      {children}
    </Paper>
  );
}

DetailsSection.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  onEdit: PropTypes.func,
  editTooltip: PropTypes.string,
  action: PropTypes.node,
  sx: PropTypes.object,
};
