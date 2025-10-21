import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

export default function MetadataInfo({ agenda }) {
  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const formatearHora = (fecha) =>
    new Date(fecha).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Box sx={{ mt: 4, color: 'text.secondary' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
        spacing={{ xs: 1, md: 2 }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <EventOutlinedIcon fontSize="small" />
          <Typography variant="caption">
            Creado el {formatearFecha(agenda.createdAt)} —{' '}
            {formatearHora(agenda.createdAt)} hs
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <HistoryOutlinedIcon fontSize="small" />
          <Typography variant="caption">
            Última modificación: {formatearFecha(agenda.updatedAt)} —{' '}
            {formatearHora(agenda.updatedAt)} hs
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

MetadataInfo.propTypes = {
  agenda: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
