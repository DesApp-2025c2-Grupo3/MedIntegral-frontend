import { Box, Link } from '@mui/material';

export default function MultiplesHorariosSection() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}
      fullWidth="true"
    >
      <Link href="#" underline="hover">
        + Agregar otro horario
      </Link>
    </Box>
  );
}
