import * as React from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function HorariosSection() {
  const diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  return (
    <Box sx={{ mt: 4 }} fullWidth="true">
      <Typography variant="h5" fontWeight="medium" sx={{ mb: 4 }}>
        Horarios de atención
      </Typography>

      <Typography variant="hsubtitle2" fontWeight="medium">
        Días de la semana
      </Typography>
      <FormGroup sx={{ mb: 4, width: '100%', mt: 2 }}>
        <Grid container spacing={1}>
          {diasSemana.map((dia) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={dia}>
              <FormControlLabel
                control={<Checkbox />}
                label={dia}
                sx={{
                  flex: 1,
                  justifyContent: 'start',
                  width: '100%',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>

      <Typography variant="hsubtitle2" fontWeight="medium">
        Especificaciones del turno
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={duraciones}
            getOptionLabel={(option) => `${option} min`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Duración de turno (minutos)"
                variant="outlined"
              />
            )}
            sx={{ width: '100%' }}
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6} md={4}>
            <DesktopTimePicker
              label="Horario inicio"
              defaultValue={dayjs().hour(9).minute(0)}
              slots={{
                actionBar: () => null,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DesktopTimePicker
              label="Horario fin"
              defaultValue={dayjs().hour(12).minute(0)}
              slots={{
                actionBar: () => null,
              }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
    </Box>
  );
}
