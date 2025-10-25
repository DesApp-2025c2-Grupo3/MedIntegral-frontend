import PropTypes from 'prop-types';
import { useRef, useLayoutEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  TextField,
  Autocomplete,
  Alert,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ButtonsSection from '../common/forms/FormActions';
import { validateEspecialidad } from '../../utils/validations/validateEspecialidad';

export default function PrestadorEditModal({
  open,
  onClose,
  prestador,
  direccion,
  especialidad,
  setEspecialidad,
  idAgenda,
  handleGuardar,
}) {
  const [error, setError] = useState(null);
  const especialidadRef = useRef(null);

  useLayoutEffect(() => {
    if (prestador?.especialidades?.length > 0) {
      especialidadRef.current?.querySelector('input')?.focus();
    }
  }, [prestador?.especialidades]);

  const handleEspecialidadChange = (_, newValue) => {
    setEspecialidad(newValue);
    setError(null);
  };

  const onGuardar = () => {
    const validation = validateEspecialidad(especialidad);
    if (validation) {
      setError(validation.message);
      return;
    }
    handleGuardar();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar datos del prestador (Agenda #{idAgenda})</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            {/* Prestador */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  label="Prestador"
                  value={prestador?.nombre || ''}
                  disabled
                />
                <Tooltip title="No se puede editar el prestador de una agenda de turnos. Para cambiarlo, creá una nueva agenda.">
                  <IconButton size="small" color="action">
                    <HelpOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>

            {/* Especialidad */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Autocomplete
                fullWidth
                value={especialidad}
                onChange={handleEspecialidadChange}
                options={prestador?.especialidades || []}
                getOptionLabel={(option) => option?.nombre || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidad"
                    inputRef={especialidadRef}
                    error={!!error}
                    helperText={error}
                  />
                )}
              />
            </Grid>

            {/* Dirección */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={direccion}
                  disabled
                />
                <Tooltip title="No se puede editar la dirección de una agenda de turnos. Para cambiarla, creá una nueva agenda.">
                  <IconButton size="small" color="action">
                    <HelpOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={onGuardar}
          onConfirmCancel={onClose}
          cancelTitle={`¿Cancelar la edición de los datos del prestador en la agenda #${idAgenda}?`}
          cancelMessage="Si cancelás ahora, se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

PrestadorEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  prestador: PropTypes.object.isRequired,
  direccion: PropTypes.string.isRequired,
  especialidad: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  setEspecialidad: PropTypes.func.isRequired,
  idAgenda: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleGuardar: PropTypes.func.isRequired,
};
