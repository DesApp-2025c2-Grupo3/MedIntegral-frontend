import { useState } from 'react';
import { Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import DetailsSection from '../common/details/DetailsSection';
import CentroMedicoEditModal from './modals/CentroMedicoEditModal';
import { usePrestador } from '../../context/PrestadorContext';

export default function CentroMedicoDetailsSection() {
  const { prestador } = usePrestador();
  const [openModal, setOpenModal] = useState(false);

  if (!prestador) return null;

  const { esCentroMedico, integraCentroMedico, centroMedicoNombre } = prestador;

  if (!esCentroMedico && !integraCentroMedico) return null;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

      <CentroMedicoEditModal open={openModal} onClose={handleClose} />
    </>
  );
}
