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
  puedeEliminar,
  onChange,
  onEliminar,
}) {
  const update = (field, value) => {
    onChange({ ...horario, [field]: value });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <DiasSemanaSelector
        dias={DIAS_SEMANA}
        selected={Array.isArray(horario.dias) ? horario.dias : []}
        onChange={(v) => update('dias', v)}
        multiple
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <MobileTimePicker
              label="Hora Inicio"
              ampm={false}
              value={
                horario.horaInicio ? dayjs(horario.horaInicio, 'HH:mm') : null
              }
              onChange={(v) => update('horaInicio', v?.format('HH:mm') || '')}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <MobileTimePicker
              label="Hora Fin"
              ampm={false}
              value={horario.horaFin ? dayjs(horario.horaFin, 'HH:mm') : null}
              onChange={(v) => update('horaFin', v?.format('HH:mm') || '')}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {puedeEliminar && (
            <Grid size={{ xs: 12 }}>
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
  puedeEliminar: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
