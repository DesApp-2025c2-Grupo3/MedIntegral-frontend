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

export default function FiltrosModalBase({
  open,
  onClose,
  fields,
  validateFn,
}) {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        PaperProps={{
          component: Paper,
          elevation: 2,
          sx: {
            borderRadius: 3,
            p: 3,
            width: '100%',
            maxWidth: 750,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
          }}
        >
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
                    options={field.options || []}
                    getOptionLabel={(opt) =>
                      typeof opt === 'string' ? opt : opt.label
                    }
                    value={values[field.name] ?? null}
                    onChange={(_, newValue) => {
                      handleChange(field.name, newValue);
                      if (field.onChange) field.onChange(newValue);
                    }}
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

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'select', 'date', 'time']),
      options: PropTypes.array,
      defaultValue: PropTypes.any,
      onChange: PropTypes.func,
    })
  ),
  validateFn: PropTypes.func,
};
