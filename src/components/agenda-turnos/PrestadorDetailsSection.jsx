import { useState } from 'react';
import { Stack, Typography, Divider } from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DetailsSection from '../common/details/DetailsSection';
import PrestadorEditModal from './PrestadorEditModal';
import { useAgenda } from '../../context/AgendaContext';

export default function PrestadorDetailsSection() {
  const { agenda, updateAgendaPartial, refetchAgenda } = useAgenda();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleGuardar = async (nuevaEspecialidad) => {
    try {
      updateAgendaPartial({ especialidad: nuevaEspecialidad });
      refetchAgenda();
    } finally {
      handleClose();
    }
  };

  const { prestador, especialidad, direccion } = agenda;

  return (
    <>
      <DetailsSection
        title="Datos del Prestador"
        icon={LocalHospitalOutlinedIcon}
        onEdit={handleOpen}
      >
        <Typography>
          <strong>Prestador:</strong> {prestador?.nombre || '—'}
        </Typography>

        <Typography>
          <strong>Especialidad:</strong> {especialidad?.nombre || '—'}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOnOutlinedIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {direccion || 'Sin dirección especificada'}
          </Typography>
        </Stack>
      </DetailsSection>

      <PrestadorEditModal
        open={openModal}
        onClose={handleClose}
        prestador={prestador}
        direccion={direccion}
        idAgenda={agenda.id}
        especialidad={especialidad}
        handleGuardar={handleGuardar}
      />
    </>
  );
}
