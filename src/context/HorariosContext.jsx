import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeHorario } from '../utils/horarios';

const HorariosContext = createContext();

export function HorariosProvider({ children }) {
  const [horarios, setHorarios] = useState([makeHorario()]);

  const agregarHorario = () => setHorarios((prev) => [...prev, makeHorario()]);

  const eliminarHorario = (id) =>
    setHorarios((prev) => prev.filter((h) => h.id !== id));

  const actualizarHorario = (id, newHorario) =>
    setHorarios((prev) => prev.map((h) => (h.id === id ? newHorario : h)));

  const resetHorarios = () => {
    setHorarios([makeHorario()]);
  };

  return (
    <HorariosContext.Provider
      value={{
        horarios,
        agregarHorario,
        eliminarHorario,
        actualizarHorario,
        resetHorarios,
      }}
    >
      {children}
    </HorariosContext.Provider>
  );
}

HorariosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useHorarios = () => useContext(HorariosContext);
