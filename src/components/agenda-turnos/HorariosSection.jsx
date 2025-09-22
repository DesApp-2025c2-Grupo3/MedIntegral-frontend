import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Autocomplete, TextField } from '@mui/material';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import FadeSlide from '../common/animations/FadeSlide';

export default function HorariosSection({
  horario,
  diasSemana,
  puedeEliminar,
  onEliminar,
  onChange,
  error,
  clearError,
}) {
  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  // Handler genérico
  const handleFieldChange = (field, value) => {
    onChange({ ...horario, [field]: value });
    if (value) clearError(`horario-${horario.id}-${field}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Horarios de atención
      </Typography>

      <FadeSlide>
        {!diasSemana.length ? (
          <Typography variant="body1" color="text.secondary">
            Seleccione una dirección para configurar los horarios de atención.
          </Typography>
        ) : (
          <>
            {/* Días de la semana */}
            <Typography variant="subtitle1" fontWeight="medium">
              Días de la semana
            </Typography>
            <DiasSemanaSelector
              dias={diasSemana}
              selected={horario.dias}
              onChange={(newDias) => handleFieldChange('dias', newDias)}
              dataField={`horario-${horario.id}-dias`}
              error={error?.field === `horario-${horario.id}-dias`}
              helperText={
                error?.field === `horario-${horario.id}-dias`
                  ? error?.message
                  : ''
              }
            />

            {/* Especificaciones del turno */}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 3 }}>
              Especificaciones del turno
            </Typography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={duraciones}
                  value={horario.duracion || null}
                  onChange={(_, newValue) =>
                    handleFieldChange('duracion', newValue)
                  }
                  getOptionLabel={(option) => `${option} min`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Duración de turno (minutos)"
                      variant="outlined"
                      data-field={`horario-${horario.id}-duracion`}
                      error={error?.field === `horario-${horario.id}-duracion`}
                      helperText={
                        error?.field === `horario-${horario.id}-duracion`
                          ? error?.message
                          : ''
                      }
                    />
                  )}
                  sx={{ width: '100%' }}
                />
              </Grid>

              <HorarioPickerGroup
                prefix={`horario-${horario.id}`}
                horario={horario}
                onChange={(field, value) => handleFieldChange(field, value)}
              />
            </Grid>

            {/* Botón de eliminar */}
            {puedeEliminar && (
              <EliminarButton
                onEliminar={onEliminar}
                label="Eliminar horario"
              />
            )}
          </>
        )}
      </FadeSlide>
    </Box>
  );
}

HorariosSection.propTypes = {
  horario: PropTypes.shape({
    id: PropTypes.string.isRequired,
    duracion: PropTypes.number,
    inicio: PropTypes.any,
    fin: PropTypes.any,
    dias: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  diasSemana: PropTypes.arrayOf(PropTypes.string).isRequired,
  puedeEliminar: PropTypes.bool,
  onEliminar: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({
    field: PropTypes.string,
    message: PropTypes.string,
  }),
  clearError: PropTypes.func.isRequired,
};
