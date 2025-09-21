import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { useFormValidationContext } from '../../../context/FormValidationContext';

export default function HorarioPickerGroup({
  horario,
  onChange,
  dataFieldInicio,
  dataFieldFin,
  dataFieldGroup,
  errorInicio,
  helperTextInicio,
  errorFin,
  helperTextFin,
  groupError,
  groupHelperText,
}) {
  const { clearError } = useFormValidationContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3} size={{ xs: 12, sm: 12, md: 8 }}>
        {/* Horario inicio */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario inicio"
            value={horario.inicio}
            onChange={(newValue) => {
              onChange('inicio', newValue);
              if (newValue) {
                clearError(dataFieldInicio);
                clearError(dataFieldGroup);
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: errorInicio || groupError,
                helperText: errorInicio
                  ? helperTextInicio
                  : groupError
                    ? groupHelperText
                    : '',
                'data-field': dataFieldInicio,
              },
            }}
          />
        </Grid>

        {/* Horario fin */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario fin"
            value={horario.fin}
            onChange={(newValue) => {
              onChange('fin', newValue);
              if (newValue) {
                clearError(dataFieldFin);
                clearError(dataFieldGroup);
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: errorFin || groupError,
                helperText: errorFin
                  ? helperTextFin
                  : groupError
                    ? groupHelperText
                    : '',
                'data-field': dataFieldFin,
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
  dataFieldInicio: PropTypes.string.isRequired,
  dataFieldFin: PropTypes.string.isRequired,
  dataFieldGroup: PropTypes.string.isRequired,
  errorInicio: PropTypes.bool,
  helperTextInicio: PropTypes.string,
  errorFin: PropTypes.bool,
  helperTextFin: PropTypes.string,
  groupError: PropTypes.bool,
  groupHelperText: PropTypes.string,
};
