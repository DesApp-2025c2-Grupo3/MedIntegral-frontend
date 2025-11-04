import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  TextField,
  Autocomplete,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import { usePrestador } from '../../../context/PrestadorContext';

export default function EspecialidadesEditModal({ open, onClose, onSuccess }) {
  const { prestador, listaEspecialidades, updateEspecialidades } =
    usePrestador();
  const [value, setValue] = useState([]);
  const [error, setError] = useState(null);
  const autoRef = useRef(null);

  useEffect(() => {
    if (open && prestador) {
      setValue(prestador.especialidades || []);
      setError(null);
    }
  }, [open, prestador]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    setError(null);
  };

  const validate = () => {
    if (!value.length) {
      setError('Debe seleccionar al menos una especialidad');
      return false;
    }
    return true;
  };

  const handleGuardar = async () => {
    if (!validate()) return;
    await updateEspecialidades(value);
    onSuccess();
    onClose();
  };

  if (!prestador) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 1,
        }}
      >
        Editar especialidades de {prestador.nombre}
        <IconButton onClick={onClose} size="small" color="default">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                value={value}
                onChange={handleChange}
                options={listaEspecialidades || []}
                getOptionLabel={(o) => o?.nombre || ''}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidades"
                    placeholder="Selecciona especialidades"
                    inputRef={autoRef}
                    error={!!error}
                    helperText={error}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={handleGuardar}
          onConfirmCancel={onClose}
          cancelTitle="¿Cancelar la edición de especialidades?"
          cancelMessage="Si cancelás ahora, se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

EspecialidadesEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
