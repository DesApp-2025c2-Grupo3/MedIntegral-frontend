import { useLayoutEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { usePrestador } from '../../context/PrestadorContext';
import ValidatedAutocomplete from '../common/forms/ValidatedAutocomplete';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function PrestadorSection() {
  const {
    prestador,
    prestadores,
    info,
    seleccionarPrestador,
    especialidadSeleccionada,
    setEspecialidadSeleccionada,
    direccionSeleccionada,
    setDireccionSeleccionada,
  } = usePrestador();

  const { clearError } = useFormValidationContext();
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

  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        {/* Prestador */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ValidatedAutocomplete
            value={prestador}
            onChange={handleChange(seleccionarPrestador, 'prestador')}
            options={prestadores}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Prestador"
            dataField="prestador"
          />
        </Grid>

        {/* Especialidad */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ValidatedAutocomplete
            value={especialidadSeleccionada}
            onChange={handleChange(setEspecialidadSeleccionada, 'especialidad')}
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
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ValidatedAutocomplete
            value={direccionSeleccionada}
            onChange={handleChange(setDireccionSeleccionada, 'direccion')}
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
