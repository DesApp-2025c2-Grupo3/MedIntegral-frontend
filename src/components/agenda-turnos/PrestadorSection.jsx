import { useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
} from '@mui/material';
import { usePrestador } from '../../context/PrestadorContext';
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

  const { error, clearError } = useFormValidationContext();

  const especialidadRef = useRef(null);

  useEffect(() => {
    if (prestador && info.especialidades.length > 0) {
      setTimeout(() => {
        especialidadRef.current?.querySelector('input')?.focus();
      }, 100);
    }
  }, [prestador, info.especialidades]);

  const handlePrestadorOnChange = (_, newValue) => {
    seleccionarPrestador(newValue);
    if (newValue) clearError('prestador');
  };

  const handleEspecialidadOnChange = (_, newValue) => {
    setEspecialidadSeleccionada(newValue);
    if (newValue) clearError('especialidad');
  };

  const handleDireccionOnChange = (_, newValue) => {
    setDireccionSeleccionada(newValue);
    if (newValue) clearError('direccion');
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        {/* Prestador */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            value={prestador}
            onChange={handlePrestadorOnChange}
            options={prestadores || []}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Prestador"
                variant="outlined"
                data-field="prestador"
                error={error?.field === 'prestador'}
                helperText={error?.field === 'prestador' ? error.message : ''}
              />
            )}
          />
        </Grid>

        {/* Especialidad */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            disabled={!prestador}
            value={especialidadSeleccionada}
            onChange={handleEspecialidadOnChange}
            options={info.especialidades || []}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Especialidad"
                variant="outlined"
                data-field="especialidad"
                error={error?.field === 'especialidad'}
                helperText={
                  error?.field === 'especialidad' ? error.message : ''
                }
              />
            )}
            ref={especialidadRef}
          />
        </Grid>

        {/* Dirección */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <Autocomplete
              fullWidth
              disabled={!prestador}
              value={direccionSeleccionada}
              onChange={handleDireccionOnChange}
              options={info.direcciones || []}
              getOptionLabel={(option) =>
                option?.calle
                  ? `${option.calle} ${option.altura || ''}`
                  : option
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Dirección"
                  variant="outlined"
                  data-field="direccion"
                  error={error?.field === 'direccion'}
                  helperText={error?.field === 'direccion' ? error.message : ''}
                />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
