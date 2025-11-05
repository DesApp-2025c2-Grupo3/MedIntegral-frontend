import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import CentroMedicoSection from '../CentroMedicoSection';
import { usePrestador } from '../../../context/PrestadorContext';
import { validateCentroMedico } from '../../../utils/validations/validateCentroMedico';
import { getCentrosMedicos } from '../../../services/centrosMedicos';

export default function CentroMedicoEditModal({ open, onClose, onSuccess }) {
  const { prestador, updateCentroMedico } = usePrestador();
  const [localData, setLocalData] = useState(null);
  const [listaCentros, setListaCentros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;

    setError(null);

    (async () => {
      const centros = await getCentrosMedicos();
      setListaCentros(centros);

      setLocalData({
        esCentroMedico: prestador.esCentroMedico ?? false,
        integraCentroMedico: prestador.integraCentroMedico ?? false,
        centroMedicoId: prestador.centroMedicoId ?? null,
      });
    })();
  }, [open, prestador]);

  useEffect(() => {
    if (!open) {
      setLocalData(null);
      setError(null);
    }
  }, [open]);

  if (!localData) return null;

  const updateField = (field) => (e) => {
    const checked = e.target.checked;
    setLocalData((prev) => ({
      ...prev,
      esCentroMedico:
        field === 'esCentroMedico' ? checked : prev.esCentroMedico,
      integraCentroMedico:
        field === 'integraCentroMedico' ? checked : prev.integraCentroMedico,
      centroMedicoId:
        field === 'esCentroMedico' || !checked ? null : prev.centroMedicoId,
    }));
    setError(null);
  };

  const handleCentroChange = (newId) => {
    setLocalData((prev) => ({
      ...prev,
      centroMedicoId: newId,
    }));
    setError(null);
  };

  const handleGuardar = async () => {
    const payload = {
      esCentroMedico: localData.esCentroMedico,
      integraCentroMedico: localData.integraCentroMedico,
      centroMedicoId: localData.integraCentroMedico
        ? localData.centroMedicoId
        : null,
    };

    const validation = validateCentroMedico(payload);
    if (validation) {
      setError(validation);
      return;
    }

    await updateCentroMedico(payload);
    onSuccess();
    onClose();
  };

  const handleCancel = () => {
    setLocalData({
      esCentroMedico: prestador.esCentroMedico ?? false,
      integraCentroMedico: prestador.integraCentroMedico ?? false,
      centroMedicoId: prestador.centroMedicoId ?? null,
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Editar centro médico de {prestador.nombre}
        <IconButton onClick={handleCancel} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <CentroMedicoSection
            isCentroMedico={localData.esCentroMedico}
            integraCentroMedico={localData.integraCentroMedico}
            centroMedicoId={localData.centroMedicoId}
            listaCentrosMedicos={listaCentros}
            onSwitchChange={updateField}
            onCentroMedicoChange={handleCentroChange}
            error={error?.field === 'centroMedicoId'}
            helperText={error?.message}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={handleGuardar}
          onConfirmCancel={handleCancel}
          cancelTitle="¿Cancelar la edición del centro médico?"
          cancelMessage="Si cancelás ahora, se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

CentroMedicoEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
