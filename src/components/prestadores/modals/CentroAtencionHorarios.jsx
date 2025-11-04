import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CentroAtencionHorarioItem from './CentroAtencioHorarioItem';

export default function CentroAtencionHorarios({ centro, onChange }) {
  const addHorario = () => {
    onChange({
      ...centro,
      horarios: [
        ...centro.horarios,
        { id: crypto.randomUUID(), dias: [], horaInicio: '', horaFin: '' },
      ],
    });
  };

  const updateHorario = (id, nuevo) => {
    onChange({
      ...centro,
      horarios: centro.horarios.map((h) => (h.id === id ? nuevo : h)),
    });
  };

  const deleteHorario = (id) => {
    onChange({
      ...centro,
      horarios: centro.horarios.filter((h) => h.id !== id),
    });
  };

  return (
    <Box>
      {centro.horarios.map((h) => (
        <CentroAtencionHorarioItem
          key={h.id}
          horario={h}
          puedeEliminar={centro.horarios.length > 1}
          onChange={(nuevo) => updateHorario(h.id, nuevo)}
          onEliminar={() => deleteHorario(h.id)}
        />
      ))}

      <Button
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addHorario}
      >
        Agregar horario
      </Button>
    </Box>
  );
}

CentroAtencionHorarios.propTypes = {
  centro: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
