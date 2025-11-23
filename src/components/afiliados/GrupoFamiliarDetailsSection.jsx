import { useState } from 'react';
import { Typography, Stack, Snackbar, Alert } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import DetailsSection from '../common/details/DetailsSection';
import { useAfiliado } from '../../context/AfiliadoContext';
import MiembroFamiliarDetails from './MiembroFamiliarDetails';
import CheckIcon from '@mui/icons-material/Check';

export default function GrupoFamiliarDetailsSection() {
  const { afiliado } = useAfiliado();
  const [toast, setToast] = useState(null);

  if (!afiliado) return null;

  const { dependientes } = afiliado;

  const handleToastClose = () => setToast(null);

  return (
    <>
      <DetailsSection title="Grupo Familiar" icon={FamilyRestroomIcon}>
        {dependientes && dependientes.length > 0 ? (
          <Stack spacing={3}>
            {dependientes.map((miembro, index) => (
              <MiembroFamiliarDetails
                key={miembro.id}
                miembro={miembro}
                numero={index + 1}
              />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">
            El afiliado no tiene grupo familiar registrado.
          </Typography>
        )}
      </DetailsSection>

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
            sx={{ color: 'white', fontWeight: 200 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
