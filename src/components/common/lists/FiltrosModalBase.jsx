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

export default function FiltrosModalBase({ open, onClose, fields }) {
  return (
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
                  defaultValue={field.defaultValue ?? ''}
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
                  onChange={(_, newValue) => {
                    if (field.onChange) field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={field.label}
                      variant="outlined"
                    />
                  )}
                />
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  size="medium"
                  defaultValue={field.defaultValue ?? ''}
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
          <Button color="error" sx={{ textTransform: 'none' }}>
            Borrar filtros
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={onClose}
          >
            Buscar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
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
};
