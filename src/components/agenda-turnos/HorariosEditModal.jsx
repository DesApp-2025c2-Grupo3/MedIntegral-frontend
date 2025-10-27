import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  IconButton,
  Alert,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useAgenda } from '../../context/AgendaContext';
import ButtonsSection from '../common/forms/FormActions';
import { updateAgendaHorarios } from '../../services/agendaTurnos';
import { validateHorarios } from '../../utils/validations/validateHorariosEdicion';

export default function HorariosEditModal({ open, onClose }) {
  const {
    agenda,
    updateAgenda,
    setGlobalLoading,
    setError,
    setSuccessMessage,
  } = useAgenda();
  const [localHorarios, setLocalHorarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (open && agenda?.horariosAtencion) {
      setLocalHorarios(agenda.horariosAtencion);
      setErrorMessage(null);
    }
  }, [agenda, open]);

  const handleChange = (index, field, value) => {
    const updated = [...localHorarios];
    updated[index] = { ...updated[index], [field]: value };
    setLocalHorarios(updated);
  };

  const handleSave = async () => {
    const validation = validateHorarios(localHorarios);
    if (validation) {
      setErrorMessage(validation);
      return;
    }

    setGlobalLoading(true);
    try {
      const updated = await updateAgendaHorarios(agenda.id, localHorarios);
      updateAgenda(updated);
      setSuccessMessage('Horarios actualizados con éxito');
      onClose();
    } catch (err) {
      console.error('Error al actualizar horarios:', err);
      setError('No se pudieron actualizar los horarios.');
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Editar Horarios de Atención
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {localHorarios.map((h, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Horario {index + 1}
              </Typography>
              <TextField
                label="Días"
                fullWidth
                value={h.dias}
                onChange={(e) =>
                  handleChange(
                    index,
                    'dias',
                    e.target.value.split(',').map((d) => d.trim())
                  )
                }
              />
              <Stack direction="row" spacing={2} mt={1}>
                <TextField
                  label="Hora Inicio"
                  type="time"
                  fullWidth
                  value={h.horaInicio}
                  onChange={(e) =>
                    handleChange(index, 'horaInicio', e.target.value)
                  }
                />
                <TextField
                  label="Hora Fin"
                  type="time"
                  fullWidth
                  value={h.horaFin}
                  onChange={(e) =>
                    handleChange(index, 'horaFin', e.target.value)
                  }
                />
              </Stack>
              <TextField
                sx={{ mt: 1 }}
                label="Duración (min)"
                type="number"
                fullWidth
                value={h.duracion}
                onChange={(e) =>
                  handleChange(index, 'duracion', e.target.value)
                }
              />
            </Box>
          ))}

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>
      </DialogContent>

      <DialogActions>
        <ButtonsSection onCancel={onClose} onSave={handleSave} />
      </DialogActions>
    </Dialog>
  );
}

HorariosEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
