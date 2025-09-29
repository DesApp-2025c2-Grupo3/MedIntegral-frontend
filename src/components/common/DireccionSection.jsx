import { Box, Grid, TextField, Typography } from '@mui/material';
import ValidatedAutocomplete from '../common/forms/ValidatedAutocomplete';
import PropTypes from 'prop-types';
import EliminarButton from './forms/EliminarButton';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function DireccionSection({
  direccion,
  puedeEliminar,
  onChange,
  onEliminar,
}) {
  const handleFieldChange = (field, value) => {
    onChange({ ...direccion, [field]: value });
  };

  const [listaProvincias, setListaProvincias] = useState([]);
  const API_PROVINCIAS_URL = 'https://apis.datos.gob.ar/georef/api/provincias';

  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const response = await axios.get(API_PROVINCIAS_URL, {
          params: {
            campos: 'id,nombre',
          },
        });

        const provinciasAdaptadas = response.data.provincias.map((prov) => ({
          id: prov.id,
          provincia: prov.nombre,
        }));

        setListaProvincias(provinciasAdaptadas);
      } catch (err) {
        console.error('Error al obtener provincias:', err);
      }
    };

    cargarProvincias();
  }, []);

  const valorProvincia =
    listaProvincias.find((p) => p.id === direccion.provincia?.id) || null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
        Dirección
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Calle"
            value={direccion.calle}
            onChange={(e) => handleFieldChange('calle', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Altura"
            value={direccion.altura}
            onChange={(e) => handleFieldChange('altura', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Piso/Depto"
            value={direccion.pisoDepto}
            onChange={(e) => handleFieldChange('pisoDepto', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Código Postal"
            value={direccion.codigoPostal}
            onChange={(e) => handleFieldChange('codigoPostal', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Localidad"
            value={direccion.localidad}
            onChange={(e) => handleFieldChange('localidad', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ValidatedAutocomplete
            value={valorProvincia}
            onChange={(_, nuevaProvincia) => {
              const provinciaGuardar = nuevaProvincia
                ? { id: nuevaProvincia.id, nombre: nuevaProvincia.provincia }
                : null;
              handleFieldChange('provincia', provinciaGuardar);
            }}
            options={listaProvincias}
            getOptionLabel={(option) => option?.provincia || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Provincia"
            dataField="provincia"
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
