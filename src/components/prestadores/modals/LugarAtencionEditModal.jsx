import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import { getProvincias } from '../../../services/provincias';
import { usePrestador } from '../../../context/PrestadorContext';
import { DIAS_SEMANA } from '../../../utils/prestadores';

import CentroAtencionList from './CentroAtencionList';

export default function LugarAtencionEditModal({ open, onClose }) {
  const { prestador, updateCentrosAtencion } = usePrestador();
  const [centros, setCentros] = useState([]);
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    if (!open || !prestador) return;

    setCentros(
      (prestador.centrosAtencion || []).map((c) => ({
        ...c,
        id: crypto.randomUUID(),
        horarios: c.horarios.map((h) => ({
          id: crypto.randomUUID(),
          dias: h.dia ? [h.dia.nombre] : [],
          horaInicio: h.horaInicio,
          horaFin: h.horaFin,
        })),
      }))
    );

    getProvincias().then(setProvincias);
  }, [open, prestador]);

  const handleGuardar = async () => {
    const payload = centros.map((c) => ({
      ...c,
      horarios: c.horarios.flatMap((h) =>
        h.dias.map((diaNombre) => ({
          id: h.id,
          dia: {
            id: DIAS_SEMANA.find((d) => d.nombre === diaNombre)?.id ?? null,
            nombre: diaNombre,
          },
          horaInicio: h.horaInicio,
          horaFin: h.horaFin,
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
        <CentroAtencionList
          centros={centros}
          provincias={provincias}
          onChange={setCentros}
        />
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
