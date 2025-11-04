import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import { getProvincias } from '../../../services/provincias';
import { usePrestador } from '../../../context/PrestadorContext';
import CentroAtencionList from './CentroAtencionList';
import { DIAS_SEMANA } from '../../../utils/prestadores';

export default function LugarAtencionEditModal({ open, onClose }) {
  const { prestador, updateCentrosAtencion } = usePrestador();

  const [centros, setCentros] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (!open || !prestador) return;

    setModalLoading(true);

    const loadData = async () => {
      try {
        const provs = await getProvincias();
        setProvincias(provs);

        const normalizados = (prestador.centrosAtencion || []).map((c) => ({
          ...c,
          id: crypto.randomUUID(),
          direccion: {
            ...c.direccion,
            provincia: c.direccion.provincia
              ? provs.find((p) => p.id === c.direccion.provincia.id) || null
              : null,
          },
          horarios: c.horarios.map((h) => ({
            id: crypto.randomUUID(),
            dias: h.dia ? [{ id: h.dia.id, nombre: h.dia.nombre }] : [],
            horaInicio: h.horaInicio ?? '',
            horaFin: h.horaFin ?? '',
          })),
        }));

        setCentros(normalizados);
      } catch (err) {
        console.error('Error de carga:', err);
      } finally {
        setModalLoading(false);
      }
    };

    loadData();
  }, [open, prestador]);

  const handleGuardar = async () => {
    const payload = centros.map((c) => ({
      ...c,
      horarios: c.horarios.flatMap((h) =>
        h.dias.map((diaObj) => ({
          dia: diaObj,
          horaInicio: h.horaInicio || '',
          horaFin: h.horaFin || '',
        }))
      ),
    }));

    await updateCentrosAtencion(payload);
    onClose();
  };

  if (!prestador) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Editar centros de atención de {prestador.nombre}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3 }}>
        {modalLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CentroAtencionList
            centros={centros}
            provincias={provincias}
            onChange={setCentros}
            diasDisponibles={DIAS_SEMANA}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={handleGuardar}
          onConfirmCancel={onClose}
          cancelTitle="¿Cancelar edición?"
          cancelMessage="Se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

LugarAtencionEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
