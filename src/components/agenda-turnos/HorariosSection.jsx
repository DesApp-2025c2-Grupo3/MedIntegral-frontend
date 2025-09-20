import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Autocomplete, TextField } from '@mui/material';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import { usePrestador } from '../../context/PrestadorContext';
import { motion, AnimatePresence } from 'framer-motion';

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

      <AnimatePresence mode="wait">
        {!direccionSeleccionada ? (
          <motion.div
            key="no-direccion"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="body1" color="text.secondary">
              Seleccione una dirección para configurar los horarios de atención.
            </Typography>
          </motion.div>
        ) : (
          <motion.div
            key="con-direccion"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Días de la semana
            </Typography>
            <DiasSemanaSelector dias={diasSemana} />

            <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 3 }}>
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
          </motion.div>
        )}
      </AnimatePresence>
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
