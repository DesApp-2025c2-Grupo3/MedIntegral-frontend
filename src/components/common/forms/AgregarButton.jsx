import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';

export default function AgregarButton({ onAgregar, label }) {
  return (
    <Box
      onClick={onAgregar}
      sx={{
        mt: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        cursor: 'pointer',
      }}
    >
      <IconButton color="primary" size="small">
        <AddCircleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="body2"
        color="primary"
        fontWeight={500}
        sx={{ ml: 1 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

AgregarButton.propTypes = {
  onAgregar: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
