import { Box, Typography, Grid, TextField, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function DatosPrincipales({
  prestadorData,
  onChange,
  onEmailsChange,
  onTelefonosChange,
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
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Datos del prestador
      </Typography>

      {/* cuil / cuit */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            required
            label="CUIL / CUIT"
            name="cuilCuit"
            value={prestadorData.cuilCuit}
            onChange={onChange}
            data-field="cuilCuit"
            {...getErrorProps('cuilCuit')}
          />
        </Grid>

        {/* nombre */}
        <Grid size={{ xs: 12, sm: 6, md: 8 }}>
          <TextField
            fullWidth
            required
            label="Nombre"
            name="nombre"
            value={prestadorData.nombre}
            onChange={onChange}
            data-field="nombre"
            {...getErrorProps('nombre')}
          />
        </Grid>

        {/* telefonos */}
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <Autocomplete
            multiple
            options={[]}
            freeSolo
            value={prestadorData.telefonos}
            onChange={(_, newTelefono) => onTelefonosChange(newTelefono)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Telefonos"
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
            value={prestadorData.emails}
            onChange={(_, newEmail) => onEmailsChange(newEmail)}
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

DatosPrincipales.propTypes = {
  prestadorData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    cuilCuit: PropTypes.string.isRequired,
    emails: PropTypes.array.isRequired,
    telefonos: PropTypes.array.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onEmailsChange: PropTypes.func.isRequired,
  onTelefonosChange: PropTypes.func.isRequired,
};
