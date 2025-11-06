import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DiasSemanaSelector from '../../common/forms/DiasSemanaSelector';
import { DIAS_SEMANA } from '../../../utils/prestadores';
import dayjs from 'dayjs';
import EliminarButton from '../../common/forms/EliminarButton';
import { useEffect, useState } from 'react';

export default function LugarAtencionHorarioItem({
  horario,
  puedeEliminar,
  onChange,
  onEliminar,
  validationError,
  errorRefMap,
}) {
  const [localDias, setLocalDias] = useState([]);

  useEffect(() => {
    if (Array.isArray(horario.dias)) setLocalDias(horario.dias);
  }, [horario.dias]);

  const update = (field, value) => {
    onChange({ ...horario, [field]: value });
  };

  const baseKey = `horario-${horario.id}-`;

  const isErr = (suffix) => {
    if (!validationError?.field) return false;
    return (
      validationError.field === baseKey + suffix ||
      validationError.field === baseKey + 'horario'
    );
  };

  const registerRef = (suffix) => (el) => {
    if (!el) return;
    errorRefMap?.current.set(baseKey + suffix, el);
    errorRefMap?.current.set(baseKey + 'horario', el);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <DiasSemanaSelector
        dias={DIAS_SEMANA}
        selected={localDias}
        onChange={(v) => {
          setLocalDias(v);
          update('dias', v);
        }}
        multiple
        error={isErr('dias')}
        helperText={isErr('dias') ? validationError.message : ''}
        inputRef={registerRef('dias')}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <MobileTimePicker
              label="Hora Inicio"
              ampm={false}
              value={
                horario.horaInicio &&
                dayjs(horario.horaInicio, 'HH:mm').isValid()
                  ? dayjs(horario.horaInicio, 'HH:mm')
                  : null
              }
              onChange={(v) => update('horaInicio', v?.format('HH:mm') || '')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: isErr('inicio'),
                  helperText: isErr('inicio') ? validationError.message : '',
                  inputRef: registerRef('inicio'),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <MobileTimePicker
              label="Hora Fin"
              ampm={false}
              value={
                horario.horaFin && dayjs(horario.horaFin, 'HH:mm').isValid()
                  ? dayjs(horario.horaFin, 'HH:mm')
                  : null
              }
              onChange={(v) => update('horaFin', v?.format('HH:mm') || '')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: isErr('fin'),
                  helperText: isErr('fin') ? validationError.message : '',
                  inputRef: registerRef('fin'),
                },
              }}
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

LugarAtencionHorarioItem.propTypes = {
  horario: PropTypes.object.isRequired,
  centroId: PropTypes.string,
  puedeEliminar: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
  validationError: PropTypes.object,
  errorRefMap: PropTypes.object,
};
