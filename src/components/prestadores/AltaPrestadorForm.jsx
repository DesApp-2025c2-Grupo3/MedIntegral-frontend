import { useState, useEffect } from 'react';
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
import DatosDeContacto from './DatosDeContacto';
import { validatePrestadorDatos } from '../../utils/validations';
import { handleArrayChange } from '../../utils/handleArrayChanges';
import { getEspecialidades } from '../../services/especialidades';
import EspecialidadesSection from './EspecialidadesSection';

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

  const [listaEspecialidades, setListaEspecialidades] = useState([]);
  const [integraCentroMedico, setIntegraCentroMedico] = useState(false);
  const [centroMedicoQueIntegra, setCentroMedicoQueIntegra] = useState('');

  const [saving, setSaving] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { validateBeforeSave } = useFormValidation(validatePrestadorDatos);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const dataEspecialidades = await getEspecialidades();
        setListaEspecialidades(dataEspecialidades);
      } catch (err) {
        console.error('Error al obtener especialidades:', err);
      }
    };
    cargarEspecialidades();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrestadorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handler genérico para arrays (emails, telefonos, especialidades)
  const handleArray = handleArrayChange(setPrestadorData);

  // función para manejar los cambios de los interruptores
  const handleSwitchChange = (name) => (event) => {
    if (name === 'isCentroMedico') {
      setPrestadorData((prevData) => ({
        ...prevData,
        esCentroMedico: event.target.checked,
      }));
      // Si "Es centro médico" se activa, reseteamos el otro switch y el textfield
      if (event.target.checked) {
        setIntegraCentroMedico(false);
        setCentroMedicoQueIntegra('');
      }
    } else if (name === 'integraCentroMedico') {
      setIntegraCentroMedico(event.target.checked);
      // Si se desactiva "Integra...", reseteamos el textfield
      if (!event.target.checked) {
        setCentroMedicoQueIntegra('');
      }
    }
  };

  //función para manejar el cambio en el TextField
  const handleCentroMedicoChange = (event) => {
    setCentroMedicoQueIntegra(event.target.value);
  };

  const handleGuardar = () => {
    const finalData = { ...prestadorData };

    validateBeforeSave(prestadorData, async () => {
      try {
        setSaving(true);
        await sleepIfLocal(1500);

        const data = await createPrestador(finalData);

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

      <DatosPrincipales prestadorData={prestadorData} onChange={handleChange} />

      <DatosDeContacto contactoData={prestadorData} handleArray={handleArray} />

      <Divider sx={{ my: 4 }} />
      <EspecialidadesSection
        especialidades={prestadorData.especialidades}
        onChange={handleArray}
        listaEspecialidades={listaEspecialidades}
        isCentroMedico={prestadorData.esCentroMedico}
        integraCentroMedico={integraCentroMedico}
        centroMedicoQueIntegra={centroMedicoQueIntegra}
        onSwitchChange={handleSwitchChange}
        onCentroMedicoChange={handleCentroMedicoChange}
      />
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
