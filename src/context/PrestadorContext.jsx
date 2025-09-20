import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const PrestadorContext = createContext();

export function PrestadorProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);
  const [prestador, setPrestador] = useState(null);

  const [especialidadSeleccionada, setEspecialidadSeleccionada] =
    useState(null);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

  const [info, setInfo] = useState({
    especialidades: [],
    direcciones: [],
    horarios: [],
  });

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const res = await api.get('/prestadores');
        setPrestadores(res.data);
      } catch (err) {
        console.error('Error cargando lista de prestadores:', err);
        setPrestadores([]);
      }
    };
    fetchPrestadores();
  }, []);

  const seleccionarPrestador = async (prestadorObj) => {
    setPrestador(prestadorObj);

    setEspecialidadSeleccionada(null);
    setDireccionSeleccionada(null);
    setInfo({ especialidades: [], direcciones: [], horarios: [] });

    if (!prestadorObj) return;

    try {
      const res = await api.get(`/prestadores/${prestadorObj.id}`);
      const data = res.data;

      setInfo({
        especialidades: data.especialidades || [],
        direcciones: data.centrosDeAtencion || [],
        horarios: data.horarios || [],
      });
    } catch (err) {
      console.error('Error cargando info del prestador:', err);
      setInfo({ especialidades: [], direcciones: [], horarios: [] });
    }
  };

  return (
    <PrestadorContext.Provider
      value={{
        prestadores,
        prestador,
        info,
        seleccionarPrestador,
        especialidadSeleccionada,
        setEspecialidadSeleccionada,
        direccionSeleccionada,
        setDireccionSeleccionada,
      }}
    >
      {children}
    </PrestadorContext.Provider>
  );
}

export function usePrestador() {
  return useContext(PrestadorContext);
}

PrestadorProvider.propTypes = { children: PropTypes.node.isRequired };
