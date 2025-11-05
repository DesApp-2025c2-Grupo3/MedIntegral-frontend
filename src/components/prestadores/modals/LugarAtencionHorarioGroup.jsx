import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LugarAtencionHorarioItem from './LugarAtencionHorarioItem';

export default function LugarAtencionHorarioGroup({ centro, onChange }) {
  const updateHorario = (id, nuevoHorario) => {
    onChange({
      ...centro,
      horarios: centro.horarios.map((h) => (h.id === id ? nuevoHorario : h)),
    });
  };

  const addHorario = () => {
    onChange({
      ...centro,
      horarios: [
        ...centro.horarios,
        {
          id: crypto.randomUUID(),
          dias: [],
          horaInicio: '',
          horaFin: '',
        },
      ],
    });
  };

  const deleteHorario = (id) => {
    if (centro.horarios.length === 1) return;
    onChange({
      ...centro,
      horarios: centro.horarios.filter((h) => h.id !== id),
    });
  };

  return (
    <Box sx={{}}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
        Horarios de Atención
      </Typography>

      {centro.horarios.map((h) => (
        <LugarAtencionHorarioItem
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
        sx={{ mt: 1 }}
        onClick={addHorario}
      >
        Agregar horario
      </Button>
    </Box>
  );
}

LugarAtencionHorarioGroup.propTypes = {
  centro: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
