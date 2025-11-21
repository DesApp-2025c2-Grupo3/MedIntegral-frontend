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
        <Stack spacing={1.5}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />

              <Typography
                component={RouterLink}
                to={`/prestadores/detalle/${item.id}`}
                sx={{
                  fontWeight: 600,
                  textDecoration: 'underline',
                  color: 'primary.main',
                }}
              >
                {item.nombre}
              </Typography>

              {item.detalle && (
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  - {item.detalle}
                </Typography>
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
