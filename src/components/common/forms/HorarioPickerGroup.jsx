import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function HorarioPickerGroup({ horario }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container size={{ xs: 12, sm: 12, md: 8 }} spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario inicio"
            defaultValue={horario.inicio}
            slots={{ actionBar: () => null }}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario fin"
            defaultValue={horario.fin}
            slots={{ actionBar: () => null }}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

HorarioPickerGroup.propTypes = {
  horario: PropTypes.shape({
    inicio: PropTypes.object,
    fin: PropTypes.object,
  }).isRequired,
};
