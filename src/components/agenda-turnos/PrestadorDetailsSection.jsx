import PropTypes from 'prop-types';
import { Stack, Typography, Divider } from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DetailsSection from '../common/details/DetailsSection';

export default function PrestadorDetailsSection({ agenda, onEdit }) {
  return (
    <DetailsSection
      title="Datos del Prestador"
      icon={LocalHospitalOutlinedIcon}
      onEdit={onEdit}
    >
      <Typography>
        <strong>Prestador:</strong> {agenda.prestador || '—'}
      </Typography>

      <Typography>
        <strong>Especialidad:</strong> {agenda.especialidad || '—'}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LocationOnOutlinedIcon fontSize="small" color="action" />
        <Typography variant="body2">
          {agenda.direccion || 'Sin dirección especificada'}
        </Typography>
      </Stack>
    </DetailsSection>
  );
}

PrestadorDetailsSection.propTypes = {
  agenda: PropTypes.shape({
    prestador: PropTypes.string,
    especialidad: PropTypes.string,
    direccion: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
};
