import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  getAgendaTurnoById,
  updateAgendaEspecialidad,
  updateAgendaHorarios,
} from '../services/agendaTurnos';
import SuccessSnackbar from '../components/common/SuccessSnackbar';
import ErrorSnackbar from '../components/common/ErrorSnackbar';
import { Backdrop, CircularProgress } from '@mui/material';
import { sleepIfLocal } from '../utils/sleepIfLocal';

const AgendaContext = createContext();

export function AgendaProvider({ idAgenda, children }) {
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAgenda = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAgendaTurnoById(idAgenda);
      setAgenda(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar agenda:', err);
      setError('No se pudo cargar la agenda.');
    } finally {
      setLoading(false);
    }
  }, [idAgenda]);

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  const updateAgenda = (newAgenda) => {
    setAgenda(newAgenda);
  };

  const updateEspecialidad = async (especialidad) => {
    if (!agenda?.id || !especialidad?.id) return;

    setGlobalLoading(true);
    try {
      const data = await updateAgendaEspecialidad(agenda.id, especialidad.id);
      await sleepIfLocal(1500);
      updateAgenda(data);
      setSuccessMessage('Especialidad actualizada con éxito');
    } catch (err) {
      console.error('Error al actualizar especialidad:', err);
      setError('No se pudo actualizar la especialidad.');
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateHorarios = async (horarios) => {
    if (!agenda?.id) return;

    setGlobalLoading(true);
    setError(null);

    try {
      const horariosPayload = horarios.map((h) => ({
        dias: (h.dias || []).map((d) => Number(d.diaId)),
        horaInicio: h.horaInicio || null,
        horaFin: h.horaFin || null,
        duracion: h.duracion ?? null,
      }));
      const updated = await updateAgendaHorarios(agenda.id, horariosPayload);
      setAgenda(updated);
      setSuccessMessage('Horarios actualizados con éxito');
    } catch {
      setError('No se pudieron actualizar los horarios.');
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <AgendaContext.Provider
      value={{
        agenda,
        loading,
        error,
        globalLoading,
        successMessage,
        updateAgenda,
        updateEspecialidad,
        updateHorarios,
        refetchAgenda: fetchAgenda,
        setSuccessMessage,
        setError,
      }}
    >
      {children}

      <Backdrop open={globalLoading} sx={{ zIndex: 2000, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <SuccessSnackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />

      <ErrorSnackbar
        open={!!error}
        onClose={() => setError(null)}
        message={error}
      />
    </AgendaContext.Provider>
  );
}

AgendaProvider.propTypes = {
  idAgenda: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  children: PropTypes.node.isRequired,
};

export const useAgenda = () => useContext(AgendaContext);
