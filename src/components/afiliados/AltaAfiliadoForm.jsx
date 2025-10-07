import { useState, useEffect, useCallback } from 'react';
import { Box, Divider } from '@mui/material';
import LoadingOverlay from '../common/LoadingOverlay';
import ButtonsSection from '../common/forms/FormActions';
import ErrorSnackbar from '../common/ErrorSnackbar';
import SuccessSnackbar from '../common/SuccessSnackbar';
import { useFormValidation } from '../../hooks/useFormValidation';
import { createAfiliado } from '../../services/afiliado';
import { sleepIfLocal } from '../../utils/sleepIfLocal';

import {
  useNavigateToListado,
  useNavigateToEdicion,
} from '../../hooks/navigation';

import DatosPersonales from './DatosPersonales';
import { validateAltaAfiliado } from '../../utils/validations/validateAltaAfiliado';
import { getTiposDocumento } from '../../services/tipoDocumento';
import { handleArrayChange } from '../../utils/handleArrayChanges';
import dayjs from 'dayjs';
import Cobertura from './Cobertura';
import { getPlanesMedicos } from '../../services/cobertura';

const initialAfiliadoData = {
  tipoDocumento: null,
  numeroDocumento: '',
  fechaNacimiento: null,
  nombre: '',
  apellido: '',
  cobertura: null,
  vigenciaInicio: dayjs(),
  tieneFechaBaja: false,
  vigenciaFin: null,
  emails: [
    /*newEmail()*/
  ],
  telefonos: [
    /*newTelefono()*/
  ],
  direcciones: [
    /*newDireccion()*/
  ],
  tieneSituacionTerapeutica: false,
  situacionesTerapeuticas: [
    /*newSituacionTerapeutica()*/
  ],

  tieneGrupoFamiliar: false,
  grupoFamiliar: [],
};

export default function AltaAfiliadoForm() {
  const navigateToEdicion = useNavigateToEdicion();
  const navigateToListado = useNavigateToListado();

  const [afiliadoData, setAfiliadoData] = useState(initialAfiliadoData);
  const [listaTiposDocumento, setListaTiposDocumento] = useState([]);
  const [listaPlanesMedicos, setListaPlanesMedicos] = useState([]);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { validateBeforeSave } = useFormValidation(validateAltaAfiliado);

  useEffect(() => {
    const cargarListasIniciales = async () => {
      try {
        const [dataTipos, dataPlanes] = await Promise.all([
          getTiposDocumento(),
          getPlanesMedicos(),
        ]);

        setListaTiposDocumento(dataTipos);
        setListaPlanesMedicos(dataPlanes);
      } catch (err) {
        console.error('Error al obtener datos iniciales:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarListasIniciales();
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setAfiliadoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleGeneralChange = handleArrayChange(setAfiliadoData);

  const handleGuardar = () => {
    validateBeforeSave(afiliadoData, async () => {
      try {
        setSaving(true);
        await sleepIfLocal(1500);

        const data = await createAfiliado(afiliadoData);

        navigateToEdicion(data.id, { creacion: true });
      } catch (err) {
        console.error('Error al guardar el afiliado:', err);
        setShowError(true);
      } finally {
        setSaving(false);
      }
    });
  };

  const handleCancelar = useCallback(
    () => navigateToListado('alta-cancelada'),
    [navigateToListado]
  );

  return (
    <Box component="form" noValidate>
      <LoadingOverlay open={saving || loading} />

      <DatosPersonales
        afiliadoData={afiliadoData}
        onChange={handleChange}
        onAutocompleteChange={handleGeneralChange}
        listaTiposDocumento={listaTiposDocumento}
      />

      <Divider sx={{ my: 4 }} />

      <Cobertura
        afiliadoData={afiliadoData}
        onAutocompleteChange={handleGeneralChange}
        listaPlanesMedicos={listaPlanesMedicos}
      />

      <Divider sx={{ my: 4 }} />
      <ButtonsSection
        handleGuardar={handleGuardar}
        onConfirmCancel={handleCancelar}
        cancelTitle="¿Cancelar alta de afiliado?"
        cancelMessage="Si cancelás ahora, se perderán los datos ingresados."
      />

      <ErrorSnackbar
        open={showError}
        onClose={() => setShowError(false)}
        message="Ocurrió un error al guardar el afiliado. Por favor, revisa los campos."
      />

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Afiliado creado exitosamente."
      />
    </Box>
  );
}
