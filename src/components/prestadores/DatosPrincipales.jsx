import { Box, Typography, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormValidationContext } from '../../context/FormValidationContext';

export default function DatosPrincipales({ prestadorData, onChange }) {
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
      </Grid>
    </Box>
  );
}

DatosPrincipales.propTypes = {
  prestadorData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    cuilCuit: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
