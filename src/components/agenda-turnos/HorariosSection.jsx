import * as React from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function HorariosSection() {
  const diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  return (
    <Box sx={{ mt: 4 }} fullWidth="true">
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 4 }}>
        Horarios de atención
      </Typography>

      <FormGroup row sx={{ mb: 2 }}>
        {diasSemana.map((dia) => (
          <FormControlLabel key={dia} control={<Checkbox />} label={dia} />
        ))}
      </FormGroup>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Duración de turno (minutos)"
            type="number"
            defaultValue={30}
          />
        </Grid>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6} md={4}>
            <TimePicker
              label="Horario inicio"
              defaultValue={dayjs().hour(9).minute(0)}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TimePicker
              label="Horario fin"
              defaultValue={dayjs().hour(12).minute(0)}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
          + Agregar otro horario
        </Link>
      </Box>
    </Box>
  );
}
