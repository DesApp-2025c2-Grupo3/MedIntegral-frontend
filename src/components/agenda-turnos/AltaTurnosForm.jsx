import { Box, Divider } from '@mui/material';
import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from '../common/forms/FormActions';
import AgregarButton from '../common/forms/AgregarButton';
import { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrestador } from '../../context/PrestadorContext';
import LoadingOverlay from '../common/LoadingOverlay';

const makeHorario = () => ({
  id: crypto.randomUUID(),
  dias: [],
  duracion: 30,
  inicio: dayjs().hour(9).minute(0),
  fin: dayjs().hour(12).minute(0),
});

export default function AltaTurnosForm() {
  const { loading } = usePrestador();
  const [horarios, setHorarios] = useState([makeHorario()]);

  const handleAgregarHorario = () => {
    setHorarios((prev) => [...prev, makeHorario()]);
  };

  const handleEliminarHorario = (id) => {
    setHorarios((prev) => prev.filter((h) => h.id !== id));
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
            />
            {index === horarios.length - 1 && (
              <AgregarButton
                onAgregar={handleAgregarHorario}
                label={'Agregar otro horario'}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <Divider sx={{ my: 4 }} />

      <ButtonsSection />
    </Box>
  );
}
