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

export default function HorariosEditModal({ open, onClose }) {
  const {
    agenda,
    updateHorarios,
    setGlobalLoading,
    setError,
    setSuccessMessage,
  } = useAgenda();

  const [localHorarios, setLocalHorarios] = useState([]);
  const [errors, setErrors] = useState([]);

  const duraciones = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  const toDayjs = (value) => {
    if (!value) return null;
    const [h, m] = String(value)
      .split(':')
      .map((n) => parseInt(n, 10));
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
    return dayjs().hour(h).minute(m).second(0).millisecond(0);
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
      };
    });
  }, [agenda]);

  useEffect(() => {
    if (!(open && Array.isArray(agenda?.horariosAtencion))) return;

    const groups = new Map();

    agenda.horariosAtencion.forEach((ha) => {
      const key = `${ha.horaInicio}|${ha.horaFin}|${Number(ha.duracion) || ''}`;
      if (!groups.has(key)) {
        groups.set(key, {
          id: String(groups.size + 1),
          dias: [],
          horaInicio: ha.horaInicio || '',
          horaFin: ha.horaFin || '',
          duracion: Number(ha.duracion) || null,
        });
      }

      const group = groups.get(key);

      const matches = (diasConHorarios || [])
        .filter((d) => Number(d.diaId) === Number(ha?.dia?.id))
        .filter((d) => isWithin(ha.horaInicio, ha.horaFin, d._inicio, d._fin));

      matches.forEach((opt) => {
        if (!group.dias.some((o) => o.id === opt.id)) {
          group.dias.push(opt);
        }
      });
    });

    const payload = Array.from(groups.values());
    setLocalHorarios(
      payload.length
        ? payload
        : [{ id: '1', dias: [], horaInicio: '', horaFin: '', duracion: null }]
    );
    setErrors(payload.map(() => ({})));
  }, [agenda, open, diasConHorarios]);

  const handleHorarioChange = useCallback((index, field, value) => {
    setLocalHorarios((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setErrors((prev) => {
      const updated = [...prev];
      updated[index] = {};
      return updated;
    });
  }, []);

  const handleEliminar = useCallback((index) => {
    setLocalHorarios((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((h, idx) => ({ ...h, id: String(idx + 1) }))
    );
    setErrors((prev) => prev.filter((_, i) => i !== index).map(() => ({})));
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
    setErrors((prev) => [...prev, {}]);
  };

  const onGuardar = async () => {
    setErrors(localHorarios.map(() => ({})));

    const validation = validateHorarios(
      localHorarios,
      agenda?.prestador?.horariosAtencion || []
    );

    if (validation) {
      if (validation.horarioId) {
        const idx = localHorarios.findIndex(
          (h) => h.id === validation.horarioId
        );
        if (idx !== -1) {
          setErrors(localHorarios.map(() => ({})));
          setErrors((prev) => {
            const updated = [...prev];
            updated[idx] = { [validation.field]: validation.message };
            return updated;
          });
          return;
        }
      }
      setError(validation);
      return;
    }

    try {
      await updateHorarios(localHorarios);
      setSuccessMessage('Horarios actualizados con éxito');
      onClose();
    } catch {
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
                  error={Boolean(errors[index]?.[`horario-${horario.id}-dias`])}
                  helperText={
                    errors[index]?.[`horario-${horario.id}-dias`] || ''
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
                            <TextField
                              {...params}
                              label="Duración"
                              fullWidth
                              error={Boolean(
                                errors[index]?.[
                                  `horario-${horario.id}-duracion`
                                ]
                              )}
                              helperText={
                                errors[index]?.[
                                  `horario-${horario.id}-duracion`
                                ] || ''
                              }
                            />
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
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: Boolean(
                                errors[index]?.[
                                  `horario-${horario.id}-inicio`
                                ] ||
                                  errors[index]?.[
                                    `horario-${horario.id}-horario`
                                  ]
                              ),
                              helperText:
                                errors[index]?.[
                                  `horario-${horario.id}-inicio`
                                ] ||
                                errors[index]?.[
                                  `horario-${horario.id}-horario`
                                ] ||
                                '',
                            },
                          }}
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
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: Boolean(
                                errors[index]?.[`horario-${horario.id}-fin`] ||
                                  errors[index]?.[
                                    `horario-${horario.id}-horario`
                                  ]
                              ),
                              helperText:
                                errors[index]?.[`horario-${horario.id}-fin`] ||
                                errors[index]?.[
                                  `horario-${horario.id}-horario`
                                ] ||
                                '',
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </LocalizationProvider>

                {localHorarios.length > 1 && (
                  <Box sx={{ mt: 3 }}>
                    <EliminarButton
                      onEliminar={() => handleEliminar(index)}
                      label="Eliminar horario"
                    />
                  </Box>
                )}
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
        <ButtonsSection
          handleGuardar={onGuardar}
          onConfirmCancel={onClose}
          cancelTitle={`¿Cancelar la edición de los horarios en la agenda #${agenda.id}?`}
          cancelMessage="Si cancelás ahora, se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

HorariosEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
