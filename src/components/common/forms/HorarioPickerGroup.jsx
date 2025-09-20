import PropTypes from 'prop-types';
import { Grid, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function HorarioPickerGroup({
  horario,
  onChange,
  errorInicio,
  helperTextInicio,
  errorFin,
  helperTextFin,
  groupError,
  groupHelperText,
  dataFieldGroup,
  dataFieldInicio,
  dataFieldFin,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={3}
        size={{ xs: 12, sm: 12, md: 8 }}
        data-field={dataFieldGroup}
      >
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario inicio"
            value={horario.inicio}
            onChange={(v) => onChange('inicio', v)}
            slots={{ actionBar: () => null }}
            sx={{ width: '100%' }}
            slotProps={{
              textField: {
                error: Boolean(errorInicio),
                helperText: errorInicio ? helperTextInicio : '',
                'data-field': dataFieldInicio,
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <DesktopTimePicker
            label="Horario fin"
            value={horario.fin}
            onChange={(v) => onChange('fin', v)}
            slots={{ actionBar: () => null }}
            sx={{ width: '100%' }}
            slotProps={{
              textField: {
                error: Boolean(errorFin),
                helperText: errorFin ? helperTextFin : '',
                'data-field': dataFieldFin,
              },
            }}
          />
        </Grid>

        {groupError && (
          <Grid item xs={12}>
            <FormHelperText error>{groupHelperText}</FormHelperText>
          </Grid>
        )}
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
  errorInicio: PropTypes.bool,
  helperTextInicio: PropTypes.string,
  errorFin: PropTypes.bool,
  helperTextFin: PropTypes.string,
  groupError: PropTypes.bool,
  groupHelperText: PropTypes.string,
  dataFieldGroup: PropTypes.string,
  dataFieldInicio: PropTypes.string,
  dataFieldFin: PropTypes.string,
};

HorarioPickerGroup.defaultProps = {
  errorInicio: false,
  helperTextInicio: '',
  errorFin: false,
  helperTextFin: '',
  groupError: false,
  groupHelperText: '',
  dataFieldGroup: undefined,
  dataFieldInicio: undefined,
  dataFieldFin: undefined,
};
