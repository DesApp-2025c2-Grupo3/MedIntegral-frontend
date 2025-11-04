import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ButtonsSection from '../../common/forms/FormActions';
import { usePrestador } from '../../../context/PrestadorContext';

export default function DatosPersonalesEditModal({ open, onClose }) {
  const { prestador, updateDatosPersonales } = usePrestador();
  const [formData, setFormData] = useState({ nombre: '', cuilCuit: '' });
  const [errors, setErrors] = useState({});
  const nombreRef = useRef(null);

  useEffect(() => {
    if (open && prestador) {
      setFormData({
        nombre: prestador.nombre || '',
        cuilCuit: prestador.cuilCuit || '',
      });
      setErrors({});
    }
  }, [prestador, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.nombre?.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.cuilCuit?.trim()) {
      newErrors.cuilCuit = 'El CUIL/CUIT es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onGuardar = async () => {
    if (!validate()) return;
    await updateDatosPersonales(formData);
    onClose();
  };

  if (!prestador) return null;

  const { nombre } = prestador;

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
        Editar datos personales de {nombre}
        <IconButton onClick={onClose} size="small" color="default">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                label="CUIL / CUIT"
                name="cuilCuit"
                value={formData.cuilCuit}
                onChange={handleChange}
                error={!!errors.cuilCuit}
                helperText={errors.cuilCuit}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <TextField
                fullWidth
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                inputRef={nombreRef}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <ButtonsSection
          handleGuardar={onGuardar}
          onConfirmCancel={onClose}
          cancelTitle={`¿Cancelar la edición de los datos personales del prestador ${nombre}?`}
          cancelMessage="Si cancelás ahora, se perderán los cambios realizados."
          confirmText="Guardar cambios"
          cancelText="Cancelar"
        />
      </DialogActions>
    </Dialog>
  );
}

DatosPersonalesEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
