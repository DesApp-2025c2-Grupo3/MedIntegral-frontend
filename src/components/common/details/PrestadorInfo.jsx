import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function PrestadorInfo({ agenda }) {
  const direccion = agenda.direccion
    ? `${agenda.direccion.calle} ${agenda.direccion.altura}${
        agenda.direccion.pisoDepto ? ', ' + agenda.direccion.pisoDepto : ''
      }, ${agenda.direccion.localidad}, ${agenda.direccion.provincia}`
    : 'Sin dirección especificada';

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
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
      <Tooltip title="Editar datos del prestador">
        <IconButton
          size="small"
          color="primary"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <LocalHospitalOutlinedIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={600}>
          Datos del Prestador
        </Typography>
      </Stack>

      <Typography>
        <strong>Prestador:</strong>{' '}
        {agenda.prestador?.nombre || agenda.prestador}
      </Typography>

      <Typography>
        <strong>Especialidad:</strong>{' '}
        {agenda.especialidad?.nombre || agenda.especialidad}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LocationOnOutlinedIcon fontSize="small" color="action" />
        <Typography variant="body2">{direccion}</Typography>
      </Stack>
    </Paper>
  );
}

PrestadorInfo.propTypes = {
  agenda: PropTypes.shape({
    prestador: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
      }),
    ]),
    especialidad: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
      }),
    ]),
    direccion: PropTypes.shape({
      calle: PropTypes.string,
      altura: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      pisoDepto: PropTypes.string,
      localidad: PropTypes.string,
      provincia: PropTypes.string,
    }),
  }).isRequired,
};
