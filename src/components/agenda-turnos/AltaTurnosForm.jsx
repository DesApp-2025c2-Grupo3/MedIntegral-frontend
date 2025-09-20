import { Box, Divider } from '@mui/material';
import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from './ButtonsSection';
import AgregarHorariosButton from './AgregarHorariosButton';
import { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

const makeHorario = () => ({
  id: crypto.randomUUID(),
  dias: [],
  duracion: 30,
  inicio: dayjs().hour(9).minute(0),
  fin: dayjs().hour(12).minute(0),
});

export default function AltaTurnosForm() {
  const [horarios, setHorarios] = useState([makeHorario()]);

  const handleAgregarHorario = () => {
    setHorarios((prev) => [...prev, makeHorario()]);
  };

  const handleEliminarHorario = (id) => {
    setHorarios((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <Box component="form" noValidate>
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
              <AgregarHorariosButton onAgregar={handleAgregarHorario} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <Divider sx={{ my: 4 }} />

      <ButtonsSection />
    </Box>
  );
}
