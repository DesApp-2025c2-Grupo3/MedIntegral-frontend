import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getAgendaTurnoById } from '../services/agendaTurnos';

const AgendaContext = createContext(null);

export function AgendaProvider({ idAgenda, children }) {
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgenda = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAgendaTurnoById(idAgenda);
      setAgenda(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar la agenda:', err);
      setError('No se pudo obtener la agenda');
    } finally {
      setLoading(false);
    }
  }, [idAgenda]);

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  const updateAgendaPartial = useCallback((partial) => {
    setAgenda((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <AgendaContext.Provider
      value={{
        agenda,
        loading,
        error,
        refetchAgenda: fetchAgenda,
        updateAgendaPartial,
        setAgenda,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
}

export const useAgenda = () => {
  const ctx = useContext(AgendaContext);
  if (!ctx) {
    throw new Error('useAgenda debe usarse dentro de un <AgendaProvider>');
  }
  return ctx;
};

AgendaProvider.propTypes = {
  idAgenda: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  children: PropTypes.node,
};
