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
  deleteAgendaTurnos,
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
    try {
      const data = await getAgendaTurnoById(idAgenda);
      setAgenda(data);
      return data;
    } catch (err) {
      console.error('Error al cargar agenda:', err);
      setError('No se pudo cargar la agenda.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idAgenda]);

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  const finishWithMessage = (opts = {}) => {
    const { success, error } = opts;
    if (success) setSuccessMessage(success);
    if (error) setError(error);
    setGlobalLoading(false);
  };

  const updateEspecialidad = async (especialidad) => {
    if (!agenda?.id || !especialidad?.id) return;

    setGlobalLoading(true);
    try {
      await updateAgendaEspecialidad(agenda.id, especialidad.id);
      await sleepIfLocal(600);
      const updated = await fetchAgenda();
      finishWithMessage({ success: 'Especialidad actualizada con éxito' });
      return updated;
    } catch {
      finishWithMessage({ error: 'No se pudo actualizar la especialidad.' });
    }
  };

  const updateHorarios = async (horarios) => {
    if (!agenda?.id) return;

    setGlobalLoading(true);
    try {
      const horariosPayload = horarios.map((h) => ({
        dias: (h.dias || []).map((d) => d.nombre),
        horaInicio: h.horaInicio,
        horaFin: h.horaFin,
        duracion: h.duracion,
      }));

      console.log(horarios);

      await updateAgendaHorarios(agenda.id, horariosPayload);
      const updated = await fetchAgenda();
      finishWithMessage({ success: 'Horarios actualizados con éxito' });
      return updated;
    } catch {
      finishWithMessage({ error: 'No se pudieron actualizar los horarios.' });
    }
  };

  const deleteAgenda = async () => {
    if (!agenda?.id) return false;

    setGlobalLoading(true);
    try {
      await deleteAgendaTurnos(agenda.id);
      finishWithMessage({ success: 'Agenda eliminada con éxito' });
      return true;
    } catch {
      finishWithMessage({ error: 'No se pudo eliminar la agenda.' });
      return false;
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
        updateEspecialidad,
        updateHorarios,
        deleteAgenda,
        refetchAgenda: fetchAgenda,
        clearError: () => setError(null),
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
