import { useState } from 'react';
import { Typography, Divider, Stack, Snackbar, Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/MedicalServices';
import DetailsSection from '../common/details/DetailsSection';
import { useAfiliado } from '../../context/AfiliadoContext';
import DatosPersonalesEditModal from './modals/DatosPersonalesEditModal';
import CheckIcon from '@mui/icons-material/Check';

export default function DatosPersonalesDetailsSection() {
  const { afiliado } = useAfiliado();
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null);

  if (!afiliado) return null;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const {
    tipoDocumento,
    numeroDocumento,
    fechaNacimiento,
    nombre,
    apellido,
    vigenciaInicio,
    vigenciaFin,
  } = afiliado;

  const handleToastClose = () => setToast(null);

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  return (
    <>
      <DetailsSection
        title="Datos personales del afiliado"
        icon={PersonIcon}
        onEdit={handleOpen}
      >
        <Typography>
          <strong>Documento: </strong> {tipoDocumento?.tipo} {numeroDocumento}
        </Typography>

        <Typography>
          <strong>Nombre: </strong> {nombre} {apellido}
        </Typography>

        <Typography>
          <strong>Fecha de Nacimiento: </strong> {formatFecha(fechaNacimiento)}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Typography fontWeight={600}>Vigencia</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Typography variant="body2">
            <strong>Inicio:</strong> {formatFecha(vigenciaInicio)}
          </Typography>
          {vigenciaFin ? (
            <Typography variant="body2" color="error">
              <strong>Fin:</strong> {formatFecha(vigenciaFin)}
            </Typography>
          ) : (
            <Typography variant="body2" color="success.main">
              <strong>Estado:</strong> Activo
            </Typography>
          )}
        </Stack>

        {afiliado.dependientes && afiliado.dependientes.length > 0 && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Typography fontWeight={600}>Grupo Familiar</Typography>
            <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
              {afiliado.dependientes.map((dependiente) => (
                <Typography key={dependiente.id} component="li">
                  {dependiente.nombre} {dependiente.apellido} -{' '}
                  {dependiente.parentesco?.relacion}
                </Typography>
              ))}
            </Stack>
          </>
        )}
      </DetailsSection>

      <DatosPersonalesEditModal open={openModal} onClose={handleClose} />

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
