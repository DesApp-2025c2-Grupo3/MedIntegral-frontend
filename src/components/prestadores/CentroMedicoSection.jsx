import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Switch,
  TextField,
  Autocomplete,
  Typography,
} from '@mui/material';

export default function CentroMedicoSection({
  isCentroMedico,
  integraCentroMedico,
  centroMedicoId,
  listaCentrosMedicos = [],
  onSwitchChange,
  onCentroMedicoChange,
  error,
  helperText,
}) {
  const centrosOptions = Array.isArray(listaCentrosMedicos)
    ? listaCentrosMedicos
    : [];

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body1" fontWeight="600">
          Es Centro Médico
        </Typography>
        <Switch
          checked={isCentroMedico}
          onChange={onSwitchChange('esCentroMedico')}
        />
      </Stack>

      {!isCentroMedico && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Typography variant="body1" fontWeight="600">
            Integra Centro Médico
          </Typography>
          <Switch
            checked={integraCentroMedico}
            onChange={onSwitchChange('integraCentroMedico')}
          />
        </Stack>
      )}

      {integraCentroMedico && !isCentroMedico && (
        <Autocomplete
          sx={{ mt: 2 }}
          fullWidth
          options={centrosOptions}
          value={centrosOptions.find((c) => c.id === centroMedicoId) || null}
          onChange={(_, newValue) => onCentroMedicoChange(newValue?.id ?? null)}
          getOptionLabel={(opt) => opt?.nombre || opt?.centro || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Centro Médico"
              error={error}
              helperText={helperText}
            />
          )}
        />
      )}
    </Box>
  );
}

CentroMedicoSection.propTypes = {
  isCentroMedico: PropTypes.bool.isRequired,
  integraCentroMedico: PropTypes.bool.isRequired,
  centroMedicoId: PropTypes.number,
  listaCentrosMedicos: PropTypes.array,
  onSwitchChange: PropTypes.func.isRequired,
  onCentroMedicoChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
