import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, TextField, Autocomplete } from '@mui/material';
import CentroMedicoSection from './CentroMedicoSection';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function EspecialidadesSection({
  especialidades,
  onChange,
  listaEspecialidades,
  isCentroMedico,
  integraCentroMedico,
  centroMedicoQueIntegra,
  onSwitchChange,
  onCentroMedicoChange,
}) {
  const { error } = useFormValidationContext();

  const getErrorProps = (fieldName) => {
    const hasError = error?.field === fieldName;
    return {
      error: hasError,
      helperText: hasError ? error.message : '',
    };
  };

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
          Especialidades
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <Autocomplete
              multiple
              value={especialidades}
              onChange={(_, nuevasEspecialidades) =>
                onChange('especialidades', nuevasEspecialidades)
              }
              options={listaEspecialidades}
              getOptionLabel={(option) => option?.especialidad || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Especialidades"
                  placeholder="Selecciona especialidades"
                  {...getErrorProps('especialidades')}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        {/* componente para esCentroMedico */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <CentroMedicoSection
              isCentroMedico={isCentroMedico}
              integraCentroMedico={integraCentroMedico}
              centroMedicoQueIntegra={centroMedicoQueIntegra}
              onSwitchChange={onSwitchChange}
              onCentroMedicoChange={onCentroMedicoChange}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

EspecialidadesSection.propTypes = {
  especialidades: PropTypes.array.isRequired,
  listaEspecialidades: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  isCentroMedico: PropTypes.bool.isRequired,
  integraCentroMedico: PropTypes.bool.isRequired,
  centroMedicoQueIntegra: PropTypes.string.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  onCentroMedicoChange: PropTypes.func.isRequired,
};
