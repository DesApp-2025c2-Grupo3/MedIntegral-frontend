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

export default function CentroMedicoEditModal({ open, onClose, onSuccess }) {
  const { prestador, updateCentroMedico } = usePrestador();
  const [isCentroMedico, setIsCentroMedico] = useState(false);
  const [integraCentroMedico, setIntegraCentroMedico] = useState(false);
  const [centroMedicoQueIntegra, setCentroMedicoQueIntegra] = useState('');

  useEffect(() => {
    if (open && prestador) {
      setIsCentroMedico(prestador.esCentroMedico);
      setIntegraCentroMedico(prestador.integraCentroMedico);
      setCentroMedicoQueIntegra(prestador.centroMedicoNombre || '');
    }
  }, [open, prestador]);

  const onSwitchChange = (field) => (e) => {
    const checked = e.target.checked;

    if (field === 'isCentroMedico') {
      setIsCentroMedico(checked);
      if (checked) {
        setIntegraCentroMedico(false);
        setCentroMedicoQueIntegra('');
      }
    }

    if (field === 'integraCentroMedico') {
      setIntegraCentroMedico(checked);
      if (!checked) {
        setCentroMedicoQueIntegra('');
      }
    }
  };

  const handleGuardar = async () => {
    await updateCentroMedico({
      esCentroMedico: isCentroMedico,
      integraCentroMedico,
      centroMedicoNombre: centroMedicoQueIntegra,
    });
    onSuccess();
    onClose();
  };

  if (!prestador) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 1,
        }}
      >
        Editar centro médico de {prestador.nombre}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <CentroMedicoSection
            isCentroMedico={isCentroMedico}
            integraCentroMedico={integraCentroMedico}
            centroMedicoQueIntegra={centroMedicoQueIntegra}
            onSwitchChange={onSwitchChange}
            onCentroMedicoChange={(e) =>
              setCentroMedicoQueIntegra(e.target.value)
            }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={handleGuardar}
          onConfirmCancel={onClose}
          cancelTitle="¿Cancelar la edición de los datos del centro médico?"
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
