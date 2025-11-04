import { useState } from 'react';
import { Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DetailsSection from '../common/details/DetailsSection';
import CentroMedicoEditModal from './modals/CentroMedicoEditModal';
import { usePrestador } from '../../context/PrestadorContext';

export default function CentroMedicoDetailsSection() {
  const { prestador } = usePrestador();
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null);

  if (!prestador) return null;

  const { esCentroMedico, integraCentroMedico, centroMedicoNombre } = prestador;

  if (!esCentroMedico && !integraCentroMedico) return null;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSuccess = () =>
    setToast({ message: 'Centro médico actualizado', key: Date.now() });

  const handleToastClose = () => setToast(null);

  return (
    <>
      <DetailsSection
        title="Centro Médico"
        icon={BusinessIcon}
        onEdit={handleOpen}
      >
        {esCentroMedico ? (
          <Typography>Es un centro médico</Typography>
        ) : (
          <Typography>
            Integra centro médico: <strong>{centroMedicoNombre}</strong>
          </Typography>
        )}
      </DetailsSection>

      <CentroMedicoEditModal
        open={openModal}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />

      {toast && (
        <Snackbar
          key={toast.key}
          open
          autoHideDuration={2000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleToastClose}
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
