import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAltaTurnos } from '../../../utils/validations';

export default function HorarioPickerGroup({ prefix, horario, onChange }) {
  const { error, clearError } = useFormValidation(validateAltaTurnos);

  const fieldInicio = `${prefix}-inicio`;
  const fieldFin = `${prefix}-fin`;
  const fieldGroup = `${prefix}-horario`;

  const handleChange = (field, value) => {
    onChange(field, value);
    if (value) {
      clearError(`${prefix}-${field}`);
      clearError(fieldGroup);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        {/* Horario inicio */}
        <Grid item xs={12} sm={6}>
          <DesktopTimePicker
            label="Horario inicio"
            value={horario.inicio || null}
            onChange={(newValue) => handleChange('inicio', newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                error:
                  error?.field === fieldInicio || error?.field === fieldGroup,
                helperText:
                  error?.field === fieldInicio
                    ? error?.message
                    : error?.field === fieldGroup
                      ? error?.message
                      : '',
                'data-field': fieldInicio,
              },
            }}
          />
        </Grid>

        {/* Horario fin */}
        <Grid item xs={12} sm={6}>
          <DesktopTimePicker
            label="Horario fin"
            value={horario.fin || null}
            onChange={(newValue) => handleChange('fin', newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error?.field === fieldFin || error?.field === fieldGroup,
                helperText:
                  error?.field === fieldFin
                    ? error?.message
                    : error?.field === fieldGroup
                      ? error?.message
                      : '',
                'data-field': fieldFin,
              },
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

HorarioPickerGroup.propTypes = {
  prefix: PropTypes.string.isRequired,
  horario: PropTypes.shape({
    inicio: PropTypes.object,
    fin: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
