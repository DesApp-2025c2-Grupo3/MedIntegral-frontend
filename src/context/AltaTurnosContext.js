import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AltaTurnosContext = createContext();

export const AltaTurnosProvider = ({ children }) => {
  const [prestadores, setPrestadores] = useState([]);
  const [prestador, setPrestador] = useState(null);
  const [especialidad, setEspecialidad] = useState(null);
  const [direccion, setDireccion] = useState(null);

  const [info, setInfo] = useState({
    especialidades: [],
    direcciones: [],
  });

  const [horarios, setHorarios] = useState([]);
  const uid = () => Math.random().toString(36).slice(2, 10);

  const agregarHorario = () =>
    setHorarios((prev) => [
      ...prev,
      { id: uid(), dias: [], inicio: '', duracion: '' },
    ]);

  const actualizarHorario = (id, patch) =>
    setHorarios((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...patch } : h))
    );

  const eliminarHorario = (id) =>
    setHorarios((prev) => prev.filter((h) => h.id !== id));

  const resetHorarios = () => setHorarios([]);

  return (
    <AltaTurnosContext.Provider
      value={{
        prestadores,
        setPrestadores,
        prestador,
        setPrestador,
        especialidad,
        setEspecialidad,
        direccion,
        setDireccion,
        info,
        setInfo,
        horarios,
        agregarHorario,
        actualizarHorario,
        eliminarHorario,
        resetHorarios,
      }}
    >
      {children}
    </AltaTurnosContext.Provider>
  );
};

export const useAltaTurnos = () => useContext(AltaTurnosContext);

AltaTurnosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
