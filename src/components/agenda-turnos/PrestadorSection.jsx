import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { usePrestador } from '../../context/PrestadorContext';

export default function PrestadorSection() {
  const { prestador, prestadores, info, seleccionarPrestador, loading } =
    usePrestador();

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
            onChange={(_, newValue) => seleccionarPrestador(newValue?.id)}
            options={prestadores || []}
            getOptionLabel={(option) => option.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Prestador"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress size={18} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {info.especialidades.length > 0 && (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              fullWidth
              options={info.especialidades}
              loading={loading}
              getOptionLabel={(option) => option.nombre || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Especialidad"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress size={18} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )}

        {info.direcciones.length > 0 && (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth sx={{ display: 'block' }}>
              <Autocomplete
                fullWidth
                options={info.direcciones}
                loading={loading}
                getOptionLabel={(option) => option.calle || option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dirección"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress size={18} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
