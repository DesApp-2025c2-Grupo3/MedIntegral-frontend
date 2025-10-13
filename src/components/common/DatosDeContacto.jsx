import { Box, Typography, Grid, TextField, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function DatosDeContacto({
  contactoData,
  handleArray,
  idPrefix,
}) {
  const { error } = useFormValidationContext();

  const getErrorProps = (fieldName) => {
    const fullFieldName = idPrefix ? `${idPrefix}-${fieldName}` : fieldName;

    const hasError = error?.field === fullFieldName;
    return {
      error: hasError,
      helperText: hasError ? error.message : '',
    };
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Datos de contacto
      </Typography>

      <Grid container spacing={3}>
        {/* telefonos */}
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={contactoData.telefonos}
            onChange={(_, newValues) => handleArray('telefonos', newValues)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Teléfonos"
                placeholder="Teléfonos"
                data-field="telefonos"
                {...getErrorProps('telefonos')}
              />
            )}
          />
        </Grid>

        {/* emails */}
        <Grid size={{ xs: 12, sm: 6, md: 7 }}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={contactoData.emails}
            onChange={(_, newValues) => handleArray('emails', newValues)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Emails"
                placeholder="Emails"
                {...getErrorProps('emails')}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

DatosDeContacto.propTypes = {
  contactoData: PropTypes.shape({
    emails: PropTypes.array.isRequired,
    telefonos: PropTypes.array.isRequired,
  }).isRequired,
  handleArray: PropTypes.func.isRequired,
  idPrefix: PropTypes.string,
};
