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

import DatosPersonalesSection from './DatosPersonalesSection';
import DatosDeContacto from '../common/DatosDeContacto';
import EspecialidadesSection from './EspecialidadesSection';
import CentroAtencionSection from './CentroAtencionSection';

import { validateAltaPrestador } from '../../utils/validations/validateAltaPrestador';
import { handleArrayChange } from '../../utils/handleArrayChanges';
import { getEspecialidades } from '../../services/especialidades';
import { getCentrosMedicos } from '../../services/centrosMedicos';
import { newCentroDeAtencion } from '../../utils/prestadores';

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
    centrosDeAtencion: [newCentroDeAtencion()],
  });

  const [listaEspecialidades, setListaEspecialidades] = useState([]);
  const [listaCentrosMedicos, setListaCentrosMedicos] = useState([]);
  const [integraCentroMedico, setIntegraCentroMedico] = useState(false);
  const [centroMedicoId, setCentroMedicoId] = useState(null);

  const [saving, setSaving] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { validateBeforeSave } = useFormValidation(validateAltaPrestador);

  useEffect(() => {
    const cargarDataInicial = async () => {
      try {
        const [especialidades, centros] = await Promise.all([
          getEspecialidades(),
          getCentrosMedicos(),
        ]);
        setListaEspecialidades(especialidades);
        setListaCentrosMedicos(centros);
      } catch (err) {
        console.error('Error cargando datos iniciales: ', err);
      }
    };
    cargarDataInicial();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrestadorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArray = handleArrayChange(setPrestadorData);

  const handleSwitchChange = (field) => (event) => {
    const checked = event.target.checked;

    if (field === 'esCentroMedico') {
      setPrestadorData((prevData) => ({
        ...prevData,
        esCentroMedico: checked,
      }));

      if (checked) {
        setIntegraCentroMedico(false);
        setCentroMedicoId(null);
      }
    }

    if (field === 'integraCentroMedico') {
      setIntegraCentroMedico(checked);

      if (!checked) {
        setCentroMedicoId(null);
      }
    }
  };

  const handleCentroMedicoChange = (id) => {
    setCentroMedicoId(id);
  };

  const handleGuardar = () => {
    const payload = {
      nombre: prestadorData.nombre,
      cuilCuit: prestadorData.cuilCuit,
      esCentroMedico: prestadorData.esCentroMedico,
      integraCentroMedico,
      centroMedicoQueIntegra: centroMedicoId,
      especialidades: prestadorData.especialidades.map((e) => e.id),
      emails: prestadorData.emails,
      telefonos: prestadorData.telefonos,
      lugaresAtencion: prestadorData.centrosDeAtencion.map((c) => ({
        calle: c.calle,
        altura: Number(c.altura) || null,
        codigoPostal: c.codigoPostal || '',
        localidad: c.localidad,
        provincia: c.provincia?.id || null,
        horarios: c.horarios.map((h) => ({
          horaInicio: h.inicio ? h.inicio.format('HH:mm') : null,
          horaFin: h.fin ? h.fin.format('HH:mm') : null,
          dias: (h.dias || []).map((d) =>
            typeof d === 'string' ? d : d.nombre
          ),
        })),
      })),
    };

    validateBeforeSave(prestadorData, async () => {
      try {
        setSaving(true);
        await sleepIfLocal(1000);

        const data = await createPrestador(payload);
        navigateToEdicion(data.id, { created: true });
      } catch {
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

      <DatosPersonalesSection
        prestadorData={prestadorData}
        onChange={handleChange}
      />

      <DatosDeContacto contactoData={prestadorData} handleArray={handleArray} />

      <Divider sx={{ my: 4 }} />

      <EspecialidadesSection
        especialidades={prestadorData.especialidades}
        onChange={handleArray}
        listaEspecialidades={listaEspecialidades}
        listaCentrosMedicos={listaCentrosMedicos}
        isCentroMedico={prestadorData.esCentroMedico}
        integraCentroMedico={integraCentroMedico}
        centroMedicoId={centroMedicoId}
        onSwitchChange={handleSwitchChange}
        onCentroMedicoChange={handleCentroMedicoChange}
      />

      <Divider sx={{ my: 4 }} />

      <CentroAtencionSection
        centros={prestadorData.centrosDeAtencion}
        onChange={(nuevos) =>
          setPrestadorData((prev) => ({
            ...prev,
            centrosDeAtencion: nuevos,
          }))
        }
      />

      <ButtonsSection
        handleGuardar={handleGuardar}
        onConfirmCancel={handleCancelar}
        cancelTitle="¿Cancelar alta de prestador?"
        cancelMessage="Si cancelás ahora, se perderán los datos ingresados."
      />

      <ErrorSnackbar
        open={showError}
        onClose={() => setShowError(false)}
        message="Error al guardar el prestador"
      />

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Prestador creado exitosamente"
      />
    </Box>
  );
}

export default AltaPrestadorForm;
