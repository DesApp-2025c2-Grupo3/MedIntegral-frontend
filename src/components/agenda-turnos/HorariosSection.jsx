import * as React from 'react';
import PropTypes from 'prop-types';
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
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function HorariosSection({
  horario,
  puedeEliminar,
  onEliminar,
}) {
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
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Horarios de atención
      </Typography>

      <Typography variant="subtitle1" fontWeight="medium">
        Días de la semana
      </Typography>
      <FormGroup sx={{ mb: 4, width: '100%', mt: 1 }}>
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

      <Typography variant="subtitle1" fontWeight="medium">
        Especificaciones del turno
      </Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            options={duraciones}
            getOptionLabel={(option) => `${option} min`}
            defaultValue={horario.duracion}
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DesktopTimePicker
              label="Horario inicio"
              defaultValue={horario.inicio || dayjs().hour(9).minute(0)}
              slots={{ actionBar: () => null }}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DesktopTimePicker
              label="Horario fin"
              defaultValue={horario.fin || dayjs().hour(12).minute(0)}
              slots={{ actionBar: () => null }}
              sx={{ width: '100%' }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>

      {puedeEliminar && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            color: 'error.main',
          }}
        >
          <IconButton color="error" onClick={onEliminar} size="small">
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="error" sx={{ ml: 1 }}>
            Eliminar horario
          </Typography>
        </Box>
      )}
    </Box>
  );
}

HorariosSection.propTypes = {
  horario: PropTypes.shape({
    duracion: PropTypes.number,
    inicio: PropTypes.object,
    fin: PropTypes.object,
  }),
  puedeEliminar: PropTypes.bool,
  onEliminar: PropTypes.func,
};

HorariosSection.defaultProps = {
  horario: {
    duracion: 30,
    inicio: dayjs().hour(9).minute(0),
    fin: dayjs().hour(12).minute(0),
  },
  puedeEliminar: false,
  onEliminar: () => {},
};
