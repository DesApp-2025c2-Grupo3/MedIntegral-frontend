import { Box, Divider } from '@mui/material';
import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from '../common/forms/FormActions';
import AgregarButton from '../common/forms/AgregarButton';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrestador } from '../../context/PrestadorContext';
import LoadingOverlay from '../common/LoadingOverlay';
import { useNavigateToListado } from '../../hooks/navigation';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateAltaTurnos } from '../../utils/validations';

const makeHorario = () => ({
  id: crypto.randomUUID(),
  dias: [],
  duracion: null,
  inicio: null,
  fin: null,
});

export default function AltaTurnosForm() {
  const navigateToListado = useNavigateToListado();

  const {
    loading,
    direccionSeleccionada,
    prestador,
    especialidadSeleccionada,
  } = usePrestador();

  const [horarios, setHorarios] = useState([makeHorario()]);

  const { validateBeforeSave } = useFormValidation(validateAltaTurnos);

  const handleGuardar = () => {
    validateBeforeSave(
      {
        prestador,
        especialidad: especialidadSeleccionada,
        direccion: direccionSeleccionada,
        horarios,
      },
      () => {
        console.log('✅ Guardando alta de turnos...');
        navigateToListado('alta-exitosa');
      }
    );
  };

  const handleCancelar = () => {
    navigateToListado('alta-cancelada');
  };

  const handleAgregarHorario = () => {
    setHorarios((prev) => [...prev, makeHorario()]);
  };

  const handleEliminarHorario = (id) => {
    setHorarios((prev) => prev.filter((h) => h.id !== id));
  };

  const handleHorarioChange = (id, newHorario) => {
    setHorarios((prev) => prev.map((h) => (h.id === id ? newHorario : h)));
  };

  return (
    <Box component="form" noValidate>
      <LoadingOverlay open={loading} />
      <PrestadorSection />

      <Divider sx={{ mt: 4 }} />

      <AnimatePresence>
        {horarios.map((horario, index) => (
          <motion.div
            key={horario.id}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <HorariosSection
              horario={horario}
              numero={index + 1}
              puedeEliminar={horarios.length > 1}
              onEliminar={() => handleEliminarHorario(horario.id)}
              onChange={(newHorario) =>
                handleHorarioChange(horario.id, newHorario)
              }
            />
            {index === horarios.length - 1 && direccionSeleccionada && (
              <AgregarButton
                onAgregar={handleAgregarHorario}
                label={'Agregar otro horario'}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <Divider sx={{ my: 4 }} />

      <ButtonsSection
        handleGuardar={handleGuardar}
        onConfirmCancel={handleCancelar}
        cancelTitle="¿Cancelar alta de turnos?"
        cancelMessage="Si cancelás ahora, se perderán todos los cambios que hayas hecho en el formulario."
      />
    </Box>
  );
}
