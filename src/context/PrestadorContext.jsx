import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const PrestadorContext = createContext();

export function PrestadorProvider({ children }) {
  const [prestadores, setPrestadores] = useState([]);
  const [prestador, setPrestador] = useState(null);

  const [info, setInfo] = useState({
    especialidades: [],
    direcciones: [],
    horarios: [],
  });

  const [loadingLista, setLoadingLista] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  useEffect(() => {
    const fetchPrestadores = async () => {
      setLoadingLista(true);
      try {
        const res = await api.get('/prestadores');
        setPrestadores(res.data || []);
      } catch (err) {
        console.error('Error cargando lista de prestadores:', err);
        setPrestadores([]);
      } finally {
        setLoadingLista(false);
      }
    };

    fetchPrestadores();
  }, []);

  const seleccionarPrestador = async (id) => {
    setPrestador(id);
    setLoadingDetalle(true);

    try {
      const res = await api.get(`/prestadores/${id}`);
      const data = res.data;

      setInfo({
        especialidades: data.especialidades || [],
        direcciones: data.direcciones || [],
        horarios: data.horarios || [],
      });
    } catch (err) {
      console.error('Error cargando info del prestador:', err);
      setInfo({ especialidades: [], direcciones: [], horarios: [] });
    } finally {
      setLoadingDetalle(false);
    }
  };

  return (
    <PrestadorContext.Provider
      value={{
        prestadores,
        prestador,
        info,
        seleccionarPrestador,
        loadingLista,
        loadingDetalle,
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
