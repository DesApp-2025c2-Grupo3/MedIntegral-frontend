import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Link as RouterLink } from 'react-router-dom';

export default function PrestadoresRecordatorioModal({
  open,
  onClose,
  items = [],
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Prestadores sin agenda de turnos</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {items.map((item, index) => (
            <Box key={item.id} sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />

                <Typography
                  component={RouterLink}
                  to={`/prestadores/detalle/${item.id}`}
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'underline',
                    color: 'primary.main',
                    fontSize: '1rem',
                  }}
                >
                  {item.nombre}
                </Typography>
              </Box>

              {item.especialidades && (
                <Typography variant="body2" sx={{ ml: 2, mt: 0.5 }}>
                  <strong>
                    Especialidad
                    {item.especialidades.includes(',') ? 'es' : ''}:
                  </strong>{' '}
                  {item.especialidades}
                </Typography>
              )}

              {item.direcciones && (
                <Typography variant="body2" sx={{ ml: 2, mt: 0.5 }}>
                  <strong>
                    Dirección
                    {item.direcciones.includes(',') ? 'es' : ''}:
                  </strong>{' '}
                  {item.direcciones}
                </Typography>
              )}

              {index < items.length - 1 && (
                <Box
                  sx={{
                    height: 1,
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    mt: 1.5,
                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PrestadoresRecordatorioModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array,
};
