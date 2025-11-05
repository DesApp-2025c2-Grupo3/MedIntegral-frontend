import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

export default function LugarAtencionDireccion({
  centro,
  provincias,
  onChange,
}) {
  const updateField = (field, value) => {
    onChange({
      ...centro,
      direccion: {
        ...centro.direccion,
        [field]: value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Calle"
          fullWidth
          value={centro.direccion.calle}
          onChange={(e) => updateField('calle', e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField
          label="Altura"
          fullWidth
          value={centro.direccion.altura}
          onChange={(e) => updateField('altura', e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField
          label="Piso/Depto"
          fullWidth
          value={centro.direccion.pisoDepto}
          onChange={(e) => updateField('pisoDepto', e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Localidad"
          fullWidth
          value={centro.direccion.localidad}
          onChange={(e) => updateField('localidad', e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          SelectProps={{ native: true }}
          label="Provincia"
          fullWidth
          value={centro.direccion.provincia?.id || ''}
          onChange={(e) => {
            const provinciaId = Number(e.target.value);
            const selected =
              provincias.find((p) => p.id === provinciaId) || null;
            updateField('provincia', selected);
          }}
        >
          <option value=""></option>
          {provincias.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

LugarAtencionDireccion.propTypes = {
  centro: PropTypes.object.isRequired,
  provincias: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
