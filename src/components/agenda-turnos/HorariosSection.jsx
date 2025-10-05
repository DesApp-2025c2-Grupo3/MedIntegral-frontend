import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Autocomplete, TextField } from '@mui/material';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import HorarioPickerGroup from '../common/forms/HorarioPickerGroup';
import { usePrestador } from '../../context/PrestadorContext';
import FadeSlide from '../common/animations/FadeSlide';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function HorariosSection({
  horario,
  puedeEliminar,
  onEliminar,
  onChange,
}) {
  const { direccionSeleccionada } = usePrestador();
  const { error, clearError } = useFormValidationContext();

  const horarios = direccionSeleccionada?.horarios || [];
  const diasSemana = [...new Set(horarios.map((h) => h.dia.nombre))];

  const diasConHorarios = diasSemana.map((dia) => {
    const rangos = horarios
      .filter((h) => h.dia.nombre === dia)
      .map((h) => `${h.horaInicio} - ${h.horaFin}`)
      .join(', ');
    return rangos ? `${dia} (${rangos})` : dia;
  });

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

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
        {!direccionSeleccionada ? (
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
              dias={diasConHorarios}
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
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Autocomplete
                  options={duraciones}
                  value={horario.duracion}
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
                horario={horario}
                onChange={handleFieldChange}
                idPrefix={`horario-${horario.id}`}
              />
            </Grid>

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
    inicio: PropTypes.object,
    fin: PropTypes.object,
    dias: PropTypes.array,
  }).isRequired,
  puedeEliminar: PropTypes.bool,
  onEliminar: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};
