import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import EliminarButton from '../common/forms/EliminarButton';
import { DIAS_SEMANA } from '../../utils/prestadores';

export default function HorarioSection({
  horario,
  puedeEliminar,
  onChange,
  onEliminar,
}) {
  const handleFieldChange = (field, value) => {
    onChange({ ...horario, [field]: value });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Día de la Semana
          </Typography>
          <DiasSemanaSelector
            dias={DIAS_SEMANA}
            selected={horario.dias}
            onChange={(newDias) => handleFieldChange('dias', newDias)}
            dataField={`horario-${horario.id}-dias`}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <HorarioPickerGroup
            horario={horario}
            onChange={(field, value) => handleFieldChange(field, value)}
            dataFieldGroup={`horario-${horario.id}-horario`}
            dataFieldInicio={`horario-${horario.id}-inicio`}
            dataFieldFin={`horario-${horario.id}-fin`}
          />
        </Grid>
        <Grid item xs={2} sm={1} sx={{ textAlign: 'right' }}>
          {puedeEliminar && (
            <EliminarButton onEliminar={onEliminar} label="Eliminar horario" />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

HorarioSection.propTypes = {
  horario: PropTypes.object.isRequired,
  numero: PropTypes.number.isRequired,
  puedeEliminar: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
