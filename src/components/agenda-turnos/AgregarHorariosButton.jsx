import { Box, Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function AgregarHorariosButton({ onAgregar }) {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}
      fullWidth="true"
    >
      <Link
        component="button"
        type="button"
        underline="hover"
        sx={{ fontSize: 14, fontWeight: 500 }}
        onClick={onAgregar}
      >
        + Agregar otro horario
      </Link>
    </Box>
  );
}

AgregarHorariosButton.propTypes = {
  onAgregar: PropTypes.func.isRequired,
};
