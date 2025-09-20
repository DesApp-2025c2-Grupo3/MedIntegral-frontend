import { Box, Button } from '@mui/material';

export default function FormActions() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
      fullWidth="true"
    >
      <Button color="error" variant="text">
        Cancelar
      </Button>
      <Button color="primary" variant="contained">
        Guardar
      </Button>
    </Box>
  );
}
