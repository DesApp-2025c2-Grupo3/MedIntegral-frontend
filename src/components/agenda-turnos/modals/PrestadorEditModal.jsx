import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  Stack,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import { validateEspecialidad } from '../../../utils/validations/validateEspecialidad';
import { useAgenda } from '../../../context/AgendaContext';

export default function PrestadorEditModal({ open, onClose }) {
  const { agenda, updateEspecialidad } = useAgenda();
  const [error, setError] = useState(null);
  const [especialidadLocal, setEspecialidadLocal] = useState(null);
  const especialidadRef = useRef(null);

  useEffect(() => {
    if (open && agenda?.especialidad) {
      setEspecialidadLocal(agenda.especialidad);
      setError(null);
    }
  }, [agenda, open]);

  const handleEspecialidadChange = (_, newValue) => {
    setEspecialidadLocal(newValue);
    setError(null);
  };

  const onGuardar = async () => {
    const validation = validateEspecialidad(especialidadLocal);
    if (validation) {
      setError(validation.message);
      return;
    }
    await updateEspecialidad(especialidadLocal);

    onClose();
  };

  if (!agenda) return null;

  const { prestador, direccion, id } = agenda;

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
        Editar datos del prestador (Agenda de turnos #{id})
        <IconButton onClick={onClose} size="small" color="default">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              Si querés actualizar el prestador o la dirección, deberás{' '}
              <Link
                href="/agenda-turnos/alta"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1976d2',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                crear una nueva agenda de turnos
              </Link>
              .
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
          cancelTitle={`¿Cancelar la edición de los datos del prestador en la agenda #${id}?`}
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
};
