import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PrestadorContext = createContext();

export function PrestadorProvider({ children }) {
  const [prestador, setPrestador] = useState(null);
  const [info, setInfo] = useState({
    especialidades: [],
    direcciones: [],
    horarios: [],
  });
  const [loading, setLoading] = useState(false);

  const seleccionarPrestador = async (id) => {
    setPrestador(id);
    setLoading(true);

    try {
      const res = await fetch(`/api/prestadores/${id}`);
      const data = await res.json();

      setInfo({
        especialidades: data.especialidades || [],
        direcciones: data.direcciones || [],
        horarios: data.horarios || [],
      });
    } catch (err) {
      console.error('Error cargando info del prestador:', err);
      setInfo({ especialidades: [], direcciones: [], horarios: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrestadorContext.Provider
      value={{ prestador, info, seleccionarPrestador, loading }}
    >
      {children}
    </PrestadorContext.Provider>
  );
}

export function usePrestador() {
  return useContext(PrestadorContext);
}

PrestadorProvider.propTypes = { children: PropTypes.node.isRequired };
