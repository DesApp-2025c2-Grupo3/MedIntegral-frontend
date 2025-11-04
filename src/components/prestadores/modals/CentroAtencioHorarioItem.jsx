import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DiasSemanaSelector from '../../common/forms/DiasSemanaSelector';
import { DIAS_SEMANA } from '../../../utils/prestadores';
import dayjs from 'dayjs';
import EliminarButton from '../../common/forms/EliminarButton';

export default function CentroAtencionHorarioItem({
  horario,
  onChange,
  puedeEliminar,
  onEliminar,
}) {
  const updateField = (field, value) => {
    onChange({ ...horario, [field]: value });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <DiasSemanaSelector
        dias={DIAS_SEMANA}
        selected={horario.dias || []}
        onChange={(v) => updateField('dias', v)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <MobileTimePicker
              label="Hora Inicio"
              ampm={false}
              value={
                horario.horaInicio ? dayjs(horario.horaInicio, 'HH:mm') : null
              }
              onChange={(v) =>
                updateField('horaInicio', v?.format('HH:mm') || '')
              }
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MobileTimePicker
              label="Hora Fin"
              ampm={false}
              value={horario.horaFin ? dayjs(horario.horaFin, 'HH:mm') : null}
              onChange={(v) => updateField('horaFin', v?.format('HH:mm') || '')}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {puedeEliminar && (
            <Grid item xs={12}>
              <EliminarButton
                onEliminar={onEliminar}
                label="Eliminar horario"
              />
            </Grid>
          )}
        </Grid>
      </LocalizationProvider>
    </Box>
  );
}

CentroAtencionHorarioItem.propTypes = {
  horario: PropTypes.object.isRequired,
  puedeEliminar: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
