import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { sleepIfLocal } from '../utils/sleepIfLocal';

const PrestadorContext = createContext();

export function PrestadorProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);
  const [prestador, setPrestador] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        await sleepIfLocal(1500);
        const res = await api.get('/prestadores');
        setPrestadores(res.data);
      } catch (err) {
        console.error('Error cargando lista de prestadores:', err);
        setPrestadores([]);
      } finally {
        setLoading(false);
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

    setLoading(true);
    try {
      await sleepIfLocal(1500);
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
    } finally {
      setLoading(false);
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
        loading,
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
