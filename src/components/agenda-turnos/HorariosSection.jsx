import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Autocomplete, TextField } from '@mui/material';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import { usePrestador } from '../../context/PrestadorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function HorariosSection({
  horario,
  numero,
  puedeEliminar,
  onEliminar,
  onChange,
}) {
  const { direccionSeleccionada } = usePrestador();
  const { error, clearError } = useFormValidationContext();

  const diasSemana =
    direccionSeleccionada?.horarios?.map((h) => h.dia.nombre) || [];

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  // Handlers
  const handleDiasOnChange = (newDias) => {
    onChange({ ...horario, dias: newDias });
    if (newDias?.length > 0) clearError(`horario-${numero - 1}-dias`);
  };

  const handleDuracionOnChange = (_, newValue) => {
    onChange({ ...horario, duracion: newValue });
    if (newValue) clearError(`horario-${numero - 1}-duracion`);
  };

  const handleHorarioOnChange = (field, newValue) => {
    onChange({ ...horario, [field]: newValue });
    if (field === 'inicio' && newValue)
      clearError(`horario-${numero - 1}-inicio`);
    if (field === 'fin' && newValue) clearError(`horario-${numero - 1}-fin`);
  };

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
            {/* Días de la semana */}
            <Typography variant="subtitle1" fontWeight="medium">
              Días de la semana
            </Typography>
            <DiasSemanaSelector
              dias={diasSemana}
              selected={horario.dias}
              onChange={handleDiasOnChange}
              data-field={`horario-${numero - 1}-dias`}
              error={error?.field === `horario-${numero - 1}-dias`}
              helperText={
                error?.field === `horario-${numero - 1}-dias`
                  ? error.message
                  : ''
              }
            />

            {/* Especificaciones del turno */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 3 }}>
              Especificaciones del turno
            </Typography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Autocomplete
                  options={duraciones}
                  value={horario.duracion}
                  onChange={handleDuracionOnChange}
                  getOptionLabel={(option) => `${option} min`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Duración de turno (minutos)"
                      variant="outlined"
                      data-field={`horario-${numero - 1}-duracion`}
                      error={error?.field === `horario-${numero - 1}-duracion`}
                      helperText={
                        error?.field === `horario-${numero - 1}-duracion`
                          ? error.message
                          : ''
                      }
                    />
                  )}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <HorarioPickerGroup
                horario={horario}
                onChange={handleHorarioOnChange}
                dataFieldGroup={`horario-${numero - 1}-horario`}
                dataFieldInicio={`horario-${numero - 1}-inicio`}
                dataFieldFin={`horario-${numero - 1}-fin`}
                errorInicio={error?.field === `horario-${numero - 1}-inicio`}
                helperTextInicio={
                  error?.field === `horario-${numero - 1}-inicio`
                    ? error.message
                    : ''
                }
                errorFin={error?.field === `horario-${numero - 1}-fin`}
                helperTextFin={
                  error?.field === `horario-${numero - 1}-fin`
                    ? error.message
                    : ''
                }
                groupError={error?.field === `horario-${numero - 1}-horario`}
                groupHelperText={
                  error?.field === `horario-${numero - 1}-horario`
                    ? error.message
                    : ''
                }
              />
            </Grid>

            {/* Botón de eliminar */}
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
    dias: PropTypes.array,
  }),
  numero: PropTypes.number.isRequired,
  puedeEliminar: PropTypes.bool,
  onEliminar: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};
