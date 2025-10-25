import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Alert,
  Stack,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../common/forms/FormActions';
import { validateEspecialidad } from '../../utils/validations/validateEspecialidad';

export default function PrestadorEditModal({
  open,
  onClose,
  prestador,
  direccion,
  especialidad,
  idAgenda,
  handleGuardar,
}) {
  const [error, setError] = useState(null);
  const [especialidadLocal, setEspecialidadLocal] = useState(especialidad);
  const especialidadRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEspecialidadLocal(especialidad);
      setError(null);
    }
  }, [especialidad, open]);

  const handleEspecialidadChange = (_, newValue) => {
    setEspecialidadLocal(newValue);
    setError(null);
  };

  const onGuardar = () => {
    const validation = validateEspecialidad(especialidadLocal);
    if (validation) {
      setError(validation.message);
      return;
    }
    handleGuardar(especialidadLocal);
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
        Editar datos del prestador (Agenda #{idAgenda})
        <IconButton
          onClick={onClose}
          size="small"
          color="default"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Alert severity="info">
                Si quiere actualizar el prestador o la dirección, deberá{' '}
                <Link
                  href="/agenda-turnos/alta"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#1976d2',
                    textDecoration: 'none',
                  }}
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline !important',
                    },
                  }}
                >
                  crear una nueva agenda de turnos
                </Link>
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1">
                  <strong>Prestador:</strong> {prestador?.nombre || '—'}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1">
                  <strong>Dirección:</strong> {direccion || 'Sin dirección'}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Autocomplete
                fullWidth
                value={especialidadLocal || null}
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
          </Grid>
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
  especialidad: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
  }).isRequired,
  idAgenda: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleGuardar: PropTypes.func.isRequired,
};
