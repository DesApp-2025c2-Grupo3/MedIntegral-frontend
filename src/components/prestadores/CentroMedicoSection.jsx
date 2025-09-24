import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Collapse,
} from '@mui/material';

export default function CentroMedicoSection({
  isCentroMedico,
  integraCentroMedico,
  centroMedicoQueIntegra,
  onSwitchChange,
  onCentroMedicoChange,
}) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
    >
      {/* Switch para "¿Es centro médico?" */}
      <FormControlLabel
        control={
          <Switch
            checked={isCentroMedico}
            onChange={onSwitchChange('isCentroMedico')}
            name="isCentroMedico"
          />
        }
        label="¿Es centro médico?"
      />

      {/* Renderizado condicional del segundo Switch */}
      {!isCentroMedico && (
        <Collapse in={!isCentroMedico} orientation="horizontal">
          <FormControlLabel
            control={
              <Switch
                checked={integraCentroMedico}
                onChange={onSwitchChange('integraCentroMedico')}
                name="integraCentroMedico"
              />
            }
            label="¿Integra con un centro médico?"
          />
        </Collapse>
      )}

      {/* Renderizado condicional del TextField */}
      {integraCentroMedico && (
        <Collapse in={integraCentroMedico} orientation="horizontal">
          <TextField
            fullWidth
            label="Centro médico que integra"
            value={centroMedicoQueIntegra}
            onChange={onCentroMedicoChange}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          />
        </Collapse>
      )}
    </Box>
  );
}

CentroMedicoSection.propTypes = {
  isCentroMedico: PropTypes.bool.isRequired,
  integraCentroMedico: PropTypes.bool.isRequired,
  centroMedicoQueIntegra: PropTypes.string.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  onCentroMedicoChange: PropTypes.func.isRequired,
};
