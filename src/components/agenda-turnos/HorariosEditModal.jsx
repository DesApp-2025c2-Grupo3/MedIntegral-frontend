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
import AgregarButton from '../common/forms/AgregarButton';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import { useAgenda } from '../../context/AgendaContext';
import ButtonsSection from '../common/forms/FormActions';
import DiasSemanaSelector from '../common/forms/DiasSemanaSelector';
import EliminarButton from '../common/forms/EliminarButton';
import FadeSlide from '../common/animations/FadeSlide';
import { validateHorarios } from '../../utils/validations/validateHorariosEdicion';

import { toDayjs, fromDayjs } from '../../utils/formats/dateUtils';
import {
  buildDuraciones,
  groupHorarios,
} from '../../utils/formats/horarioGrouping';

export default function HorariosEditModal({ open, onClose }) {
  const { agenda, updateHorarios } = useAgenda();
  const [localHorarios, setLocalHorarios] = useState([]);
  const [errors, setErrors] = useState([]);

  const duraciones = buildDuraciones();

  const diasConHorarios = useMemo(() => {
    const base = agenda?.prestador?.horarios || [];
    return base.map((h, idx) => ({
      id: `${h?.dia?.id ?? idx}-${h?.horaInicio}-${h?.horaFin}`,
      diaId: h?.dia?.id ?? idx,
      nombre: h?.dia?.nombre ?? '',
      label: `${h?.dia?.nombre} (${h?.horaInicio} - ${h?.horaFin})`,
      _inicio: h?.horaInicio ?? '',
      _fin: h?.horaFin ?? '',
    }));
  }, [agenda]);

  useEffect(() => {
    if (!(open && Array.isArray(agenda?.horariosAtencion))) return;
    const payload = groupHorarios(agenda.horariosAtencion, diasConHorarios);
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
      agenda?.prestador?.horarios || []
    );

    if (validation) {
      const idx = localHorarios.findIndex((h) => h.id === validation.horarioId);
      if (idx !== -1) {
        setErrors((prev) => {
          const updated = [...prev];
          updated[idx] = { [validation.field]: validation.message };
          return updated;
        });
      } else {
        setErrors(validation);
      }
      return;
    }

    await updateHorarios(localHorarios);

    onClose();
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
                  <Grid container spacing={3} sx={{ mt: 2 }}>
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
                        getOptionLabel={(opt) =>
                          opt != null ? `${opt} min` : ''
                        }
                        isOptionEqualToValue={(opt, val) => opt === val}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Duración"
                            fullWidth
                            error={Boolean(
                              errors[index]?.[`horario-${horario.id}-duracion`]
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
                          handleHorarioChange(index, 'horaInicio', fromDayjs(v))
                        }
                        ampm={false}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: Boolean(
                              errors[index]?.[`horario-${horario.id}-inicio`] ||
                                errors[index]?.[`horario-${horario.id}-horario`]
                            ),
                            helperText:
                              errors[index]?.[`horario-${horario.id}-inicio`] ||
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
                                errors[index]?.[`horario-${horario.id}-horario`]
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

            <AgregarButton
              onAgregar={() => handleAddHorario()}
              label="Agregar horario"
            />
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
