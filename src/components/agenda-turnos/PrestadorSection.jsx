import { useLayoutEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ValidatedAutocomplete from '../common/forms/ValidatedAutocomplete';
import { useAltaTurnos } from '../../context/AltaTurnosContext';
import PropTypes from 'prop-types';

export default function PrestadorSection({ clearError, clearErrorsByPrefix }) {
  const {
    prestador,
    prestadores,
    info,
    setPrestador,
    especialidad,
    setEspecialidad,
    direccion,
    setDireccion,
    resetHorarios,
  } = useAltaTurnos();

  const especialidadRef = useRef(null);

  useLayoutEffect(() => {
    if (prestador && info.especialidades.length > 0) {
      especialidadRef.current?.querySelector('input')?.focus();
    }
  }, [prestador, info.especialidades]);

  const handleChange = (setter, clearKey) => (_, newValue) => {
    setter(newValue);
    if (newValue) clearError(clearKey);
  };

  const handleDireccionChange = (_, newValue) => {
    resetHorarios();
    clearErrorsByPrefix('horario-');
    clearError('horarios');

    setDireccion(newValue);
    if (newValue) clearError('direccion');
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        {/* Prestador */}
        <Grid item xs={12} sm={6} md={4}>
          <ValidatedAutocomplete
            value={prestador}
            onChange={handleChange(setPrestador, 'prestador')}
            options={prestadores}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Prestador"
            dataField="prestador"
          />
        </Grid>

        {/* Especialidad */}
        <Grid item xs={12} sm={6} md={4}>
          <ValidatedAutocomplete
            value={especialidad}
            onChange={handleChange(setEspecialidad, 'especialidad')}
            options={info.especialidades}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Especialidad"
            dataField="especialidad"
            disabled={!prestador}
            inputRef={especialidadRef}
          />
        </Grid>

        {/* Dirección */}
        <Grid item xs={12} sm={6} md={4}>
          <ValidatedAutocomplete
            value={direccion}
            onChange={handleDireccionChange}
            options={info.direcciones}
            getOptionLabel={(option) =>
              option?.calle ? `${option.calle} ${option.altura || ''}` : option
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Dirección"
            dataField="direccion"
            disabled={!prestador}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

PrestadorSection.propTypes = {
  clearError: PropTypes.func.isRequired,
  clearErrorsByPrefix: PropTypes.func.isRequired,
};
