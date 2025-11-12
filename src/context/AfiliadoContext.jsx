import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  getAfiliadoById,
  updateAfiliadoDatosPersonales,
  /*updateAfiliadoCobertura,
  updateAfiliadoSituacionesTerapeuticas,
  updateAfiliadoDatosContacto,
  updateAfiliadoDirecciones,
  deleteAfiliadoById,
  */
} from '../services/afiliado';
import SuccessSnackbar from '../components/common/SuccessSnackbar';
import ErrorSnackbar from '../components/common/ErrorSnackbar';
import { Backdrop, CircularProgress } from '@mui/material';

const AfiliadoContext = createContext();

export function AfiliadoProvider({ idAfiliado, children }) {
  const [afiliado, setAfiliado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAfiliado = useCallback(async () => {
    try {
      const data = await getAfiliadoById(idAfiliado);
      setAfiliado(data);
      return data;
    } catch {
      setError('No se pudo cargar el afiliado.');
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, [idAfiliado]);

  useEffect(() => {
    fetchAfiliado();
  }, [fetchAfiliado]);

  const finishWithMessage = ({ success, error }) => {
    if (success) setSuccessMessage(success);
    if (error) setError(error);
    setGlobalLoading(false);
  };

  const updateDatosPersonales = async (data) => {
    if (!afiliado?.id) return;
    setGlobalLoading(true);

    const payload = {
      tipoDocumentoId: data.tipoDocumento?.id,
      numeroDocumento: data.numeroDocumento,
      fechaNacimiento: data.fechaNacimiento,
      nombre: data.nombre,
      apellido: data.apellido,
    };

    try {
      await updateAfiliadoDatosPersonales(afiliado.id, payload);
      const updated = await fetchAfiliado();
      finishWithMessage({ success: 'Datos personales actualizados con éxito' });
      return updated;
    } catch {
      finishWithMessage({
        error: 'No se pudieron actualizar los datos personales.',
      });
    }
  };

  return (
    <AfiliadoContext.Provider
      value={{
        afiliado,
        loading,
        error,
        globalLoading,
        successMessage,
        setSuccessMessage,
        updateDatosPersonales,
        refetchAfiliado: fetchAfiliado,
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
    </AfiliadoContext.Provider>
  );
}

AfiliadoProvider.propTypes = {
  idAfiliado: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  children: PropTypes.node.isRequired,
};

export const useAfiliado = () => useContext(AfiliadoContext);
