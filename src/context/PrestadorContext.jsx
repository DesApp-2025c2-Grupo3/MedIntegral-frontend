import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  getPrestadorById,
  /*updatePrestadorDatosPersonales,
  updatePrestadorDatosContacto,
  updatePrestadorEspecialidades,
  updatePrestadorCentroMedico,
  updatePrestadorCentrosDeAtencion,*/
  deletePrestadorById,
} from '../services/prestadores';
import SuccessSnackbar from '../components/common/SuccessSnackbar';
import ErrorSnackbar from '../components/common/ErrorSnackbar';
import { Backdrop, CircularProgress } from '@mui/material';

const PrestadorContext = createContext();

export function PrestadorProvider({ idPrestador, children }) {
  const [prestador, setPrestador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPrestador = useCallback(async () => {
    try {
      const data = await getPrestadorById(idPrestador);
      setPrestador(data);
      return data;
    } catch {
      setError('No se pudo cargar el prestador.');
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, [idPrestador]);

  useEffect(() => {
    fetchPrestador();
  }, [fetchPrestador]);

  const finishWithMessage = ({ success, error }) => {
    if (success) setSuccessMessage(success);
    if (error) setError(error);
    setGlobalLoading(false);
  };

  const deletePrestador = async () => {
    if (!prestador?.id) return false;

    setGlobalLoading(true);
    try {
      await deletePrestadorById(prestador.id);
      finishWithMessage({ success: 'Prestador eliminado con éxito' });
      return true;
    } catch {
      finishWithMessage({ error: 'No se pudo eliminar el prestador.' });
      return false;
    }
  };

  return (
    <PrestadorContext.Provider
      value={{
        prestador,
        loading,
        error,
        globalLoading,
        successMessage,
        setSuccessMessage,
        deletePrestador,
        refetchPrestador: fetchPrestador,
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
    </PrestadorContext.Provider>
  );
}

PrestadorProvider.propTypes = {
  idPrestador: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  children: PropTypes.node.isRequired,
};

export const usePrestador = () => useContext(PrestadorContext);
