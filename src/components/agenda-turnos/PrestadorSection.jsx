import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  Autocomplete,
} from '@mui/material';

export default function PrestadorSection() {
  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            options={[
              'Dra. Tita Merello',
              'Dr. Juan Pérez',
              'Dra. María López',
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Prestador" variant="outlined" />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            fullWidth
            options={['Cardiología', 'Pediatría', 'Dermatología']}
            renderInput={(params) => (
              <TextField {...params} label="Especialidad" variant="outlined" />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <Autocomplete
              fullWidth
              options={[
                'Avenida Vergara 1908',
                'Av. Corrientes 1234',
                'San Martín 456',
              ]}
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
