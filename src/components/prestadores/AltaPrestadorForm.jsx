import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import LoadingOverlay from '../common/LoadingOverlay';
import ButtonsSection from '../common/forms/FormActions';
import ErrorSnackbar from '../common/ErrorSnackbar';
import SuccessSnackbar from '../common/SuccessSnackbar';

import { useFormValidation } from '../../hooks/useFormValidation';
import { createPrestador } from '../../services/prestadores';
import { sleepIfLocal } from '../../utils/sleepIfLocal';

import {
  useNavigateToListado,
  useNavigateToEdicion,
} from '../../hooks/navigation';

import DatosPrincipales from './DatosPrincipales';
import { validatePrestadorDatos } from '../../utils/validations';

function AltaPrestadorForm() {
  const navigateToEdicion = useNavigateToEdicion();
  const navigateToListado = useNavigateToListado();

  const [prestadorData, setPrestadorData] = useState({
    nombre: '',
    cuilCuit: '',
    esCentroMedico: false,
    especialidades: [],
    emails: [],
    telefonos: [],
    centrosDeAtencion: [],
  });

  const [saving, setSaving] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { validateBeforeSave } = useFormValidation(validatePrestadorDatos);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrestadorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    validateBeforeSave(prestadorData, async () => {
      try {
        setSaving(true);
        await sleepIfLocal(1500);

        const data = await createPrestador(prestadorData);

        navigateToEdicion(data.id, { creacion: true });
      } catch (err) {
        console.error('Error al guardar el prestador:', err);
        setShowError(true);
      } finally {
        setSaving(false);
      }
    });
  };

  const handleCancelar = () => navigateToListado('alta-cancelada');

  return (
    <Box component="form" noValidate>
      <LoadingOverlay open={saving} />

      {/* Sección de datos principales (nombre, dni) */}
      <DatosPrincipales prestadorData={prestadorData} onChange={handleChange} />

      <Divider sx={{ my: 4 }} />

      <ButtonsSection
        handleGuardar={handleGuardar}
        onConfirmCancel={handleCancelar}
        cancelTitle="¿Cancelar alta de prestador?"
        cancelMessage="Si cancelás ahora, se perderán los datos ingresados."
      />

      <ErrorSnackbar
        open={showError}
        onClose={() => setShowError(false)}
        message="Ocurrió un error al guardar el prestador. Por favor, revisa los campos."
      />

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Prestador creado exitosamente."
      />
    </Box>
  );
}

export default AltaPrestadorForm;
