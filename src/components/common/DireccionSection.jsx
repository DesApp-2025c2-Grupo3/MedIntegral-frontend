import { Box, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import EliminarButton from './forms/EliminarButton';

export default function DireccionSection({
  direccion,
  puedeEliminar,
  onChange,
  onEliminar,
}) {
  const handleFieldChange = (field, value) => {
    onChange({ ...direccion, [field]: value });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
        Dirección
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Calle"
            value={direccion.calle}
            onChange={(e) => handleFieldChange('calle', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Altura"
            value={direccion.altura}
            onChange={(e) => handleFieldChange('altura', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Piso/Depto"
            value={direccion.pisoDepto}
            onChange={(e) => handleFieldChange('pisoDepto', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Código Postal"
            value={direccion.codigoPostal}
            onChange={(e) => handleFieldChange('codigoPostal', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Localidad"
            value={direccion.localidad}
            onChange={(e) => handleFieldChange('localidad', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Provincia"
            value={direccion.provincia?.nombre || ''}
            onChange={(e) =>
              handleFieldChange('provincia', {
                id: null,
                nombre: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
      </Grid>

      {puedeEliminar && (
        <EliminarButton onEliminar={onEliminar} label="Eliminar dirección" />
      )}
    </Box>
  );
}

DireccionSection.propTypes = {
  direccion: PropTypes.object.isRequired,
  numero: PropTypes.number.isRequired,
  puedeEliminar: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};
