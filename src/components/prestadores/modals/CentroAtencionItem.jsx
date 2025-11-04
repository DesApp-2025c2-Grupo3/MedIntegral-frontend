import PropTypes from 'prop-types';
import { Box, Typography, Divider } from '@mui/material';
import CentroAtencionDireccion from './CentroAtencionDireccion';
import CentroAtencionHorarios from './CentroAtencionHorarios';
import EliminarButton from '../../common/forms/EliminarButton';

export default function CentroAtencionItem({
  centro,
  provincias,
  onUpdate,
  onDelete,
  index,
  total,
}) {
  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="medium">
          Centro de Atención #{index + 1}
        </Typography>

        {total > 1 && (
          <EliminarButton onEliminar={onDelete} label="Eliminar centro" />
        )}
      </Box>

      <CentroAtencionDireccion
        centro={centro}
        provincias={provincias}
        onChange={onUpdate}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Horarios de Atención
      </Typography>

      <CentroAtencionHorarios centro={centro} onChange={onUpdate} />
    </Box>
  );
}

CentroAtencionItem.propTypes = {
  centro: PropTypes.object.isRequired,
  provincias: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
