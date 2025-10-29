import { Box, Grid, TextField } from '@mui/material';
import ValidatedAutocomplete from '../common/forms/ValidatedAutocomplete';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useFormValidationContext } from '../../context/FormValidationContext';
import { getProvincias } from '../../services/provincias';

export default function DireccionSection({ direccion, onChange, idPrefix }) {
  const handleFieldChange = (field, value) => {
    onChange({ ...direccion, [field]: value });
  };

  const { error } = useFormValidationContext();

  const getErrorProps = (fieldName) => {
    const fullFieldName = idPrefix ? `${idPrefix}-${fieldName}` : fieldName;
    const hasError = error?.field === fullFieldName;
    return {
      error: hasError,
      helperText: hasError ? error.message : '',
    };
  };

  const [listaProvincias, setListaProvincias] = useState([]);

  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const data = await getProvincias();

        setListaProvincias(data);
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <ValidatedAutocomplete
            value={valorProvincia}
            onChange={(_, nuevaProvincia) => {
              handleFieldChange('provincia', nuevaProvincia);
            }}
            options={listaProvincias}
            getOptionLabel={(option) => option?.nombre || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Provincia"
            dataField="provincia"
            {...getErrorProps('provincia')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            label="Localidad"
            value={direccion.localidad}
            onChange={(e) => handleFieldChange('localidad', e.target.value)}
            fullWidth
            {...getErrorProps('localidad')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            label="Código Postal"
            value={direccion.codigoPostal}
            onChange={(e) => handleFieldChange('codigoPostal', e.target.value)}
            fullWidth
            {...getErrorProps('codigoPostal')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            label="Calle"
            value={direccion.calle}
            onChange={(e) => handleFieldChange('calle', e.target.value)}
            fullWidth
            {...getErrorProps('calle')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            label="Altura"
            value={direccion.altura}
            onChange={(e) => handleFieldChange('altura', e.target.value)}
            fullWidth
            {...getErrorProps('altura')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            label="Piso/Depto"
            value={direccion.pisoDepto}
            onChange={(e) => handleFieldChange('pisoDepto', e.target.value)}
            fullWidth
            {...getErrorProps('pisoDepto')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

DireccionSection.propTypes = {
  direccion: PropTypes.object.isRequired,
  numero: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  idPrefix: PropTypes.string,
};
