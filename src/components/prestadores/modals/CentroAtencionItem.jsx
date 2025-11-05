import PropTypes from 'prop-types';
import { Box, Typography, Divider } from '@mui/material';
import CentroAtencionDireccion from './CentroAtencionDireccion';
import CentroAtencionHorarioGroup from './CentroAtencionHorarioGroup';
import EliminarButton from '../../common/forms/EliminarButton';

export default function CentroAtencionItem({
  centro,
  provincias,
  index,
  total,
  onUpdate,
  onDelete,
}) {
  const updateCentro = (nuevo) => onUpdate(nuevo);

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
        onChange={updateCentro}
      />

      <Divider sx={{ my: 3 }} />

      <CentroAtencionHorarioGroup centro={centro} onChange={updateCentro} />
    </Box>
  );
}

CentroAtencionItem.propTypes = {
  centro: PropTypes.object.isRequired,
  provincias: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
