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
import { validateEspecialidad } from '../../../utils/validations/validateEspecialidad';
import { getEspecialidades } from '../../../services/especialidades';
import { usePrestador } from '../../../context/PrestadorContext';

export default function EspecialidadesEditModal({ open, onClose }) {
  const { prestador, updateEspecialidades } = usePrestador();

  const [localValue, setLocalValue] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [error, setError] = useState(null);

  const autoRef = useRef(null);

  useEffect(() => {
    if (!open || !prestador) return;

    const loadData = async () => {
      try {
        const lista = await getEspecialidades();
        setEspecialidades(lista || []);
        setLocalValue(prestador.especialidades || []);
        setError(null);
      } catch (err) {
        console.error('Error cargando especialidades:', err);
      }
    };

    loadData();
  }, [open, prestador]);

  if (!prestador) return null;

  const handleChange = (_, newValue) => {
    setLocalValue(newValue);
    setError(null);
  };

  const onGuardar = async () => {
    if (!localValue.length) {
      setError('Seleccioná al menos una especialidad.');
      return;
    }

    const invalid = localValue.find((e) => validateEspecialidad(e));
    if (invalid) {
      const validation = validateEspecialidad(invalid);
      setError(validation?.message || 'Especialidad inválida');
      return;
    }

    await updateEspecialidades(localValue);
    onClose();
  };

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
                value={localValue}
                onChange={handleChange}
                options={especialidades}
                getOptionLabel={(o) => o?.nombre || ''}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidades"
                    placeholder="Selecciona una o más"
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
          handleGuardar={onGuardar}
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
};
