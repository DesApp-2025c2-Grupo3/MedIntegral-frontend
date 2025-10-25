import { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography, Divider } from '@mui/material';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DetailsSection from '../common/details/DetailsSection';
import PrestadorEditModal from './PrestadorEditModal';

export default function PrestadorDetailsSection({
  prestador,
  especialidad,
  direccion,
  idAgenda,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] =
    useState(especialidad);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleGuardar = () => {
    console.log('Guardado especialidad:', especialidadSeleccionada);
    handleClose();
  };

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
          <strong>Especialidad:</strong>{' '}
          {especialidadSeleccionada?.nombre || especialidad || '—'}
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
        especialidad={especialidadSeleccionada}
        setEspecialidad={setEspecialidadSeleccionada}
        idAgenda={idAgenda}
        handleGuardar={handleGuardar}
      />
    </>
  );
}

PrestadorDetailsSection.propTypes = {
  prestador: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    especialidades: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        nombre: PropTypes.string,
      })
    ),
    horariosAtencion: PropTypes.array,
  }),
  especialidad: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
    }),
  ]),
  direccion: PropTypes.string,
  idAgenda: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
