import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useFormValidationContext } from '../../../context/FormValidationContext';

export default function HorarioPickerGroup({ horario, onChange, idPrefix }) {
  const { error, clearError, clearErrorsByPrefix } = useFormValidationContext();

  const isFieldError = (suffix) => error?.field === `${idPrefix}-${suffix}`;
  const getHelperText = (suffix) =>
    isFieldError(suffix) ? error?.message : '';

  const isGroupError = error?.field === `${idPrefix}-horario`;
  const groupHelperText = isGroupError ? error?.message : '';

  const handleChange = (field, value) => {
    onChange(field, value);

    if (value) {
      clearError(`${idPrefix}-${field}`);
      clearErrorsByPrefix(idPrefix);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3} size={{ xs: 12, sm: 12, md: 8 }}>
        {/* Hora de inicio */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <MobileTimePicker
            label="Horario inicio"
            value={horario.inicio}
            onChange={(v) => handleChange('inicio', v)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: isFieldError('inicio') || isGroupError,
                helperText:
                  getHelperText('inicio') ||
                  (isGroupError ? groupHelperText : ''),
                'data-field': `${idPrefix}-inicio`,
              },
            }}
          />
        </Grid>

        {/* Hora de fin */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <MobileTimePicker
            label="Horario fin"
            value={horario.fin}
            onChange={(v) => handleChange('fin', v)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: isFieldError('fin') || isGroupError,
                helperText:
                  getHelperText('fin') || (isGroupError ? groupHelperText : ''),
                'data-field': `${idPrefix}-fin`,
              },
            }}
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
  onChange: PropTypes.func.isRequired,
  idPrefix: PropTypes.string.isRequired,
};
