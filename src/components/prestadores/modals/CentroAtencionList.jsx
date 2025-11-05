import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CentroAtencionItem from './CentroAtencionItem';

export default function CentroAtencionList({ centros, provincias, onChange }) {
  const updateOne = (id, nuevo) => {
    onChange(centros.map((c) => (c.id === id ? nuevo : c)));
  };

  const deleteOne = (id) => {
    onChange(centros.filter((c) => c.id !== id));
  };

  const addOne = () => {
    onChange([
      ...centros,
      {
        id: crypto.randomUUID(),
        direccion: {
          calle: '',
          altura: '',
          pisoDepto: '',
          localidad: '',
          provincia: null,
        },
        horarios: [
          {
            id: crypto.randomUUID(),
            dias: [],
            horaInicio: '',
            horaFin: '',
          },
        ],
      },
    ]);
  };

  return (
    <>
      {centros.map((c, i) => (
        <CentroAtencionItem
          key={c.id}
          centro={c}
          provincias={provincias}
          index={i}
          total={centros.length}
          onUpdate={(nuevo) => updateOne(c.id, nuevo)}
          onDelete={() => deleteOne(c.id)}
        />
      ))}

      <Button startIcon={<AddCircleOutlineIcon />} onClick={addOne}>
        Agregar centro de atención
      </Button>
    </>
  );
}

CentroAtencionList.propTypes = {
  centros: PropTypes.array.isRequired,
  provincias: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
