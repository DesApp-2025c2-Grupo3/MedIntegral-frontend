import { useState } from 'react';
import { Typography, Stack, Snackbar, Alert } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import CheckIcon from '@mui/icons-material/Check';
import DetailsSection from '../common/details/DetailsSection';
import { usePrestador } from '../../context/PrestadorContext';
import EspecialidadesEditModal from './modals/EspecialidadesEditModal';

export default function EspecialidadesDetailsSection() {
  const { prestador } = usePrestador();
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null);

  if (!prestador) return null;

  const { especialidades } = prestador;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSuccess = () => {
    setToast({ message: 'Especialidades actualizadas', key: Date.now() });
  };

  const handleToastClose = () => setToast(null);

  return (
    <>
      <DetailsSection
        title="Especialidades del prestador"
        icon={ScienceIcon}
        onEdit={handleOpen}
      >
        <Typography fontWeight={600}>Especialidades</Typography>
        <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
          {Array.isArray(especialidades) && especialidades.length > 0 ? (
            especialidades.map((e) => (
              <Typography key={e.id} component="li">
                {e.nombre}
              </Typography>
            ))
          ) : (
            <Typography color="text.secondary">Sin especialidades</Typography>
          )}
        </Stack>
      </DetailsSection>

      <EspecialidadesEditModal
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
