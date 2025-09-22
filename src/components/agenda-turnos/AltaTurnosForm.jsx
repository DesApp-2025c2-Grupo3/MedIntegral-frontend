import { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from '../common/forms/FormActions';
import AgregarButton from '../common/forms/AgregarButton';
import LoadingOverlay from '../common/LoadingOverlay';
import ErrorSnackbar from '../common/ErrorSnackbar';
import FadeSlide from '../common/animations/FadeSlide';

import { useAltaTurnos } from '../../context/AltaTurnosContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateAltaTurnos } from '../../utils/validations';
import { createAgendaTurnos } from '../../services/agendaTurnos';
import {
  useNavigateToListado,
  useNavigateToEdicion,
} from '../../hooks/navigation';
import { sleepIfLocal } from '../../utils/sleepIfLocal';

export default function AltaTurnosForm() {
  const navigateToListado = useNavigateToListado();
  const navigateToEdicion = useNavigateToEdicion();

  const {
    prestador,
    especialidad,
    direccion,
    horarios,
    agregarHorario,
    eliminarHorario,
    actualizarHorario,
  } = useAltaTurnos();

  const [saving, setSaving] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    validateBeforeSave,
    setValidationError,
    error,
    clearError,
    clearErrorsByPrefix,
  } = useFormValidation(validateAltaTurnos);

  const handleGuardar = () => {
    validateBeforeSave(
      { prestador, especialidad, direccion, horarios },
      async () => {
        try {
          setSaving(true);
          await sleepIfLocal(1500);
          const data = await createAgendaTurnos({
            prestador,
            especialidad,
            direccion,
            horarios,
          });
          navigateToEdicion(data.id, { creacion: true });
        } catch (err) {
          console.error('Error al guardar el alta de turnos:', err);

          if (err?.response?.data?.field && err?.response?.data?.message) {
            setValidationError(
              err.response.data.field,
              err.response.data.message
            );
          } else {
            setShowError(true);
          }
        } finally {
          setSaving(false);
        }
      }
    );
  };

  const handleCancelar = () => navigateToListado('alta-cancelada');

  const diasSemana = direccion?.horarios?.map((h) => h.dia.nombre) || [];

  return (
    <Box component="form" noValidate>
      <LoadingOverlay open={saving} />

      <PrestadorSection
        clearError={clearError}
        clearErrorsByPrefix={clearErrorsByPrefix}
      />
      <Divider sx={{ mt: 4 }} />

      <div>
        {horarios.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Todavía no hay horarios cargados.
          </Typography>
        ) : (
          <AnimatePresence>
            {horarios.map((horario) => (
              <FadeSlide key={horario.id}>
                <HorariosSection
                  horario={horario}
                  diasSemana={diasSemana}
                  puedeEliminar={horarios.length > 1}
                  onEliminar={() => eliminarHorario(horario.id)}
                  onChange={(newHorario) =>
                    actualizarHorario(horario.id, newHorario)
                  }
                  error={error}
                  clearError={clearError}
                />
                {direccion &&
                  horario.id === horarios[horarios.length - 1].id && (
                    <AgregarButton
                      onAgregar={agregarHorario}
                      label="Agregar otro horario"
                    />
                  )}
              </FadeSlide>
            ))}
          </AnimatePresence>
        )}
      </div>

      <Divider sx={{ my: 4 }} />

      <ButtonsSection
        handleGuardar={handleGuardar}
        onConfirmCancel={handleCancelar}
        cancelTitle="¿Cancelar alta de turnos?"
        cancelMessage="Si cancelás ahora, se perderán todos los cambios que hayas hecho en el formulario."
      />

      <ErrorSnackbar
        open={showError}
        onClose={() => setShowError(false)}
        message="Ocurrió un error al guardar la agenda de turnos."
      />
    </Box>
  );
}
