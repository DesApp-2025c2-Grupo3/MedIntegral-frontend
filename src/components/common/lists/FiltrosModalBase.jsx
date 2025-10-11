import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Autocomplete,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { debouncedFetch } from '../../../utils/debouncedFetch';

export default function FiltrosModalBase({
  open,
  onClose,
  fields,
  validateFn,
}) {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [optionsMap, setOptionsMap] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleBuscar = () => {
    if (validateFn) {
      const validation = validateFn(values);
      if (validation) {
        setError(validation);
        if (!validation.field) setToastOpen(true);
        return;
      }
    }
    onClose(values);
  };

  const handleBorrar = () => {
    setValues({});
    setError(null);
  };

  const handleAsyncSearch = (field, inputValue) => {
    if (!field.asyncSearchUrl) return;
    debouncedFetch(
      field.asyncSearchUrl,
      inputValue,
      (opts) =>
        setOptionsMap((prev) => ({
          ...prev,
          [field.name]: opts,
        })),
      field.debounceDelay || 400,
      field.formatter,
      { textInputSearch: inputValue }
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose(null)}
        maxWidth="md"
        PaperProps={{
          component: Paper,
          elevation: 2,
          sx: { borderRadius: 3, p: 3, width: '100%', maxWidth: 750 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Filtros de búsqueda
        </DialogTitle>

        <DialogContent>
          <Grid rowSpacing={4} columnSpacing={2} container>
            {fields?.map((field) => (
              <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                {field.type === 'date' || field.type === 'time' ? (
                  <TextField
                    fullWidth
                    label={field.label}
                    size="medium"
                    type={field.type}
                    value={values[field.name] ?? ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    error={error?.field === field.name}
                    helperText={
                      error?.field === field.name ? error.message : ''
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                ) : field.type === 'select' ? (
                  <Autocomplete
                    fullWidth
                    size="medium"
                    options={
                      field.asyncSearchUrl
                        ? optionsMap[field.name] || []
                        : field.options || []
                    }
                    getOptionLabel={(opt) =>
                      typeof opt === 'string' ? opt : opt.label
                    }
                    value={values[field.name] ?? null}
                    isOptionEqualToValue={(opt, val) =>
                      opt?.value === val?.value
                    }
                    onInputChange={(_, inputValue) =>
                      field.asyncSearchUrl &&
                      handleAsyncSearch(field, inputValue)
                    }
                    onChange={(_, newValue) =>
                      handleChange(field.name, newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={field.label}
                        variant="outlined"
                        error={error?.field === field.name}
                        helperText={
                          error?.field === field.name ? error.message : ''
                        }
                      />
                    )}
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    size="medium"
                    value={values[field.name] ?? ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    error={error?.field === field.name}
                    helperText={
                      error?.field === field.name ? error.message : ''
                    }
                  />
                )}
              </Grid>
            ))}
          </Grid>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              color="error"
              sx={{ textTransform: 'none' }}
              onClick={handleBorrar}
            >
              Borrar filtros
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: 'none' }}
              onClick={handleBuscar}
            >
              Buscar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <ErrorSnackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={error?.message || 'Error de validación.'}
      />
    </>
  );
}

FiltrosModalBase.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fields: PropTypes.array,
  validateFn: PropTypes.func,
};
