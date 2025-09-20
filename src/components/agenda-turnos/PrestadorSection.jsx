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

  const especialidadRef = useRef(null);

  useEffect(() => {
    if (prestador && info.especialidades.length > 0) {
      setTimeout(() => {
        especialidadRef.current?.querySelector('input')?.focus();
      }, 100);
    }
  }, [prestador, info.especialidades]);

  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            value={prestador}
            onChange={(_, newValue) => seleccionarPrestador(newValue)}
            options={prestadores || []}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="Prestador" variant="outlined" />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            disabled={!prestador}
            value={especialidadSeleccionada}
            onChange={(_, newValue) => setEspecialidadSeleccionada(newValue)}
            options={info.especialidades || []}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="Especialidad" variant="outlined" />
            )}
            ref={especialidadRef}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <Autocomplete
              fullWidth
              disabled={!prestador}
              value={direccionSeleccionada}
              onChange={(_, newValue) => setDireccionSeleccionada(newValue)}
              options={info.direcciones || []}
              getOptionLabel={(option) =>
                option?.calle
                  ? `${option.calle} ${option.altura || ''}`
                  : option
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Dirección" variant="outlined" />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
