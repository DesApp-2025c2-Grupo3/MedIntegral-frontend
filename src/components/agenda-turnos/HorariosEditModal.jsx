import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Stack,
  Grid,
  Autocomplete,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';

import { useAgenda } from '../../context/AgendaContext';
import ButtonsSection from '../common/forms/FormActions';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import FadeSlide from '../common/animations/FadeSlide';
import { validateHorarios } from '../../utils/validations/validateHorariosEdicion';
import { updateAgendaHorarios } from '../../services/agendaTurnos';

export default function HorariosEditModal({ open, onClose }) {
  const {
    agenda,
    updateAgenda,
    setGlobalLoading,
    setError,
    setSuccessMessage,
  } = useAgenda();

  const [localHorarios, setLocalHorarios] = useState([]);

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  const toDayjs = (value) => {
    if (!value) return null;
    const parsed = dayjs(value, ['HH:mm', 'H:mm']);
    return parsed.isValid() ? parsed : null;
  };

  const fromDayjs = (value) =>
    value?.isValid?.() ? value.format('HH:mm') : '';

  const toMinutes = (hhmm) => {
    if (!hhmm || typeof hhmm !== 'string') return NaN;
    const [h, m] = hhmm.trim().split(':');
    const hh = parseInt(h, 10);
    const mm = parseInt(m, 10);
    return Number.isFinite(hh) && Number.isFinite(mm) ? hh * 60 + mm : NaN;
  };

  const isWithin = (start, end, rangeStart, rangeEnd) => {
    const s = toMinutes(start);
    const e = toMinutes(end);
    const rs = toMinutes(rangeStart);
    const re = toMinutes(rangeEnd);
    if ([s, e, rs, re].some(Number.isNaN)) return false;
    return s >= rs && e <= re;
  };

  const diasConHorarios = useMemo(() => {
    const base = agenda?.prestador?.horariosAtencion || [];
    return base.map((h, idx) => {
      const diaId = h?.dia?.id ?? idx;
      const nombreDia = h?.dia?.nombre ?? '';
      const horaInicio = h?.horaInicio ?? '';
      const horaFin = h?.horaFin ?? '';
      return {
        id: `${diaId}-${horaInicio}-${horaFin}`,
        diaId,
        nombre: nombreDia,
        label: `${nombreDia || `(díaId:${diaId})`} (${horaInicio} - ${horaFin})`,
        _inicio: horaInicio,
        _fin: horaFin,
        _raw: h,
      };
    });
  }, [agenda]);

  useEffect(() => {
    if (!(open && Array.isArray(agenda?.horariosAtencion))) return;

    const normalizados = agenda.horariosAtencion.map((ha, idx) => {
      const selected = (diasConHorarios || []).filter((d) => {
        const sameDay = Number(d.diaId) === Number(ha?.dia?.id);
        if (!sameDay) return false;
        return isWithin(ha.horaInicio, ha.horaFin, d._inicio, d._fin);
      });

      return {
        id: ha.id || String(idx + 1),
        dias: selected,
        horaInicio: ha.horaInicio || '',
        horaFin: ha.horaFin || '',
        duracion: Number(ha.duracion) || null,
      };
    });

    setLocalHorarios(
      normalizados.length
        ? normalizados
        : [{ id: '1', dias: [], horaInicio: '', horaFin: '', duracion: null }]
    );
  }, [agenda, open, diasConHorarios]);

  const handleHorarioChange = useCallback((index, field, value) => {
    setLocalHorarios((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleEliminar = useCallback((index) => {
    setLocalHorarios((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddHorario = () => {
    setLocalHorarios((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        dias: [],
        horaInicio: '',
        horaFin: '',
        duracion: null,
      },
    ]);
  };

  const handleSave = async () => {
    const validation = validateHorarios(localHorarios);
    if (validation) return;

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Editar horarios de atención
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <FadeSlide>
          <Stack spacing={4}>
            {localHorarios.map((horario, index) => (
              <Box
                key={horario.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  mt: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ mb: 2 }}
                >
                  Horario {index + 1}
                </Typography>

                <DiasSemanaSelector
                  dias={diasConHorarios}
                  selected={horario.dias}
                  onChange={(newDias) =>
                    handleHorarioChange(index, 'dias', newDias)
                  }
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Especificaciones del turno
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Autocomplete
                          options={duraciones}
                          value={horario.duracion ?? null}
                          onChange={(_, newValue) =>
                            handleHorarioChange(
                              index,
                              'duracion',
                              newValue ?? null
                            )
                          }
                          getOptionLabel={(opt) => (opt ? `${opt} min` : '')}
                          isOptionEqualToValue={(a, b) => a === b}
                          renderInput={(params) => (
                            <TextField {...params} label="Duración" fullWidth />
                          )}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <MobileTimePicker
                          label="Horario inicio"
                          value={toDayjs(horario.horaInicio)}
                          onChange={(v) =>
                            handleHorarioChange(
                              index,
                              'horaInicio',
                              fromDayjs(v)
                            )
                          }
                          ampm={false}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <MobileTimePicker
                          label="Horario fin"
                          value={toDayjs(horario.horaFin)}
                          onChange={(v) =>
                            handleHorarioChange(index, 'horaFin', fromDayjs(v))
                          }
                          ampm={false}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </LocalizationProvider>

                <Box sx={{ mt: 3 }}>
                  <EliminarButton
                    onEliminar={() => handleEliminar(index)}
                    label="Eliminar horario"
                  />
                </Box>
              </Box>
            ))}

            <Box textAlign="center">
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  mt: 2,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={handleAddHorario}
              >
                + Agregar horario
              </Typography>
            </Box>
          </Stack>
        </FadeSlide>
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
