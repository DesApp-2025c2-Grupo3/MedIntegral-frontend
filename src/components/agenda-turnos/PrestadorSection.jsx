import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';

export default function PrestadorSection() {
  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 4 }}>
        Datos del prestador
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <InputLabel id="prestador-label">Prestador</InputLabel>
            <Select
              labelId="prestador-label"
              input={<OutlinedInput label="Prestador" />}
              sx={{ width: '100%' }}
            >
              <MenuItem value="1">Dra. Tita Merello</MenuItem>
              <MenuItem value="2">Dr. Juan Pérez</MenuItem>
              <MenuItem value="3">Dra. María López</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <InputLabel id="esp-label">Especialidad</InputLabel>
            <Select
              labelId="esp-label"
              input={<OutlinedInput label="Especialidad" />}
              sx={{ width: '100%' }}
            >
              <MenuItem value="cardiologia">Cardiología</MenuItem>
              <MenuItem value="pediatria">Pediatría</MenuItem>
              <MenuItem value="dermatologia">Dermatología</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth sx={{ display: 'block' }}>
            <InputLabel id="dir-label">Dirección</InputLabel>
            <Select
              labelId="dir-label"
              input={<OutlinedInput label="Dirección" />}
              sx={{ width: '100%' }}
            >
              <MenuItem value="vergara">Avenida Vergara 1908</MenuItem>
              <MenuItem value="corrientes">Av. Corrientes 1234</MenuItem>
              <MenuItem value="sanmartin">San Martín 456</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
