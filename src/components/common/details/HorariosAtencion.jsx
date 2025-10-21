import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Box,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function HorariosAtencion({ agenda }) {
  const formatearDias = (dias = []) => {
    if (!Array.isArray(dias)) return '';
    if (dias.length === 1) return dias[0];
    if (dias.length === 2) return `${dias[0]} y ${dias[1]}`;
    const ultimosDos = dias.slice(-2).join(' y ');
    return `${dias.slice(0, -2).join(', ')}, ${ultimosDos}`;
  };

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
      }}
    >
      <Tooltip title="Editar horarios de atención">
        <IconButton
          size="small"
          color="primary"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <CalendarMonthOutlinedIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={600}>
          Horarios de Atención
        </Typography>
      </Stack>

      {agenda.horariosAtencion?.length > 0 ? (
        <Stack spacing={1.5}>
          {agenda.horariosAtencion.map((h, index) => (
            <Box key={index}>
              <Typography variant="body1" fontWeight={500}>
                {formatearDias(h.dias)}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <AccessTimeOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {h.horaInicio} a {h.horaFin} hs — Duración por turno:{' '}
                  {h.duracion} min
                </Typography>
              </Stack>
              {index < agenda.horariosAtencion.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">
          No hay horarios registrados
        </Typography>
      )}
    </Paper>
  );
}

HorariosAtencion.propTypes = {
  agenda: PropTypes.shape({
    horariosAtencion: PropTypes.arrayOf(
      PropTypes.shape({
        dias: PropTypes.arrayOf(PropTypes.string),
        horaInicio: PropTypes.string,
        horaFin: PropTypes.string,
        duracion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
  }).isRequired,
};
