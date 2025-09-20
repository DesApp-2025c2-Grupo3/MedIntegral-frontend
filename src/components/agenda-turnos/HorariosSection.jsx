import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Box, Typography, Grid, Autocomplete, TextField } from '@mui/material';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import { usePrestador } from '../../context/PrestadorContext';

export default function HorariosSection({
  horario,
  puedeEliminar,
  onEliminar,
}) {
  const { direccionSeleccionada } = usePrestador();

  const diasSemana =
    direccionSeleccionada?.horarios?.map((h) => h.dia.nombre) || [];

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Horarios de atención
      </Typography>
      {!direccionSeleccionada ? (
        <Typography variant="body1" color="text.secondary">
          Seleccione una dirección para configurar los horarios de atención.
        </Typography>
      ) : (
        <>
          <Typography variant="subtitle1" fontWeight="medium">
            Días de la semana
          </Typography>
          <DiasSemanaSelector dias={diasSemana} />

          <Typography variant="subtitle1" fontWeight="medium">
            Especificaciones del turno
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Autocomplete
                options={duraciones}
                getOptionLabel={(option) => `${option} min`}
                defaultValue={horario.duracion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Duración de turno (minutos)"
                    variant="outlined"
                  />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>
            <HorarioPickerGroup horario={horario} />
          </Grid>

          {puedeEliminar && (
            <EliminarButton
              onEliminar={onEliminar}
              label={'Eliminar horario'}
            />
          )}
        </>
      )}
    </Box>
  );
}

HorariosSection.propTypes = {
  horario: PropTypes.shape({
    duracion: PropTypes.number,
    inicio: PropTypes.object,
    fin: PropTypes.object,
  }),
  puedeEliminar: PropTypes.bool,
  onEliminar: PropTypes.func,
};

HorariosSection.defaultProps = {
  horario: {
    duracion: 30,
    inicio: dayjs().hour(9).minute(0),
    fin: dayjs().hour(12).minute(0),
  },
  puedeEliminar: false,
  onEliminar: () => {},
};
