import { Box, Divider } from '@mui/material';
import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from './ButtonsSection';
import AgregarHorariosButton from './AgregarHorariosButton';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function AltaTurnosForm() {
  const [horarios, setHorarios] = useState([
    {
      dias: [],
      duracion: 30,
      inicio: dayjs('09:00', 'HH:mm'),
      fin: dayjs('12:00', 'HH:mm'),
    },
  ]);

  const handleAgregarHorario = () => {
    setHorarios([
      ...horarios,
      { dias: [], duracion: 30, inicio: null, fin: null },
    ]);
  };

  const handleEliminarHorario = (index) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };
  return (
    <Box component="form" noValidate>
      <PrestadorSection />

      <Divider sx={{ my: 6 }} />

      {horarios.map((horario, index) => (
        <HorariosSection
          key={index}
          index={index}
          horario={horario}
          puedeEliminar={horarios.length > 1}
          onEliminar={() => handleEliminarHorario(index)}
        />
      ))}

      <AgregarHorariosButton onAgregar={handleAgregarHorario} />

      <Divider sx={{ my: 6 }} />

      <ButtonsSection />
    </Box>
  );
}
