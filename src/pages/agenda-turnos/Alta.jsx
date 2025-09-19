import { Paper, Box, Typography } from '@mui/material';

export default function AltaTurnos() {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight={'medium'}>
        Alta de turnos
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Ingrese los datos para crear un nuevo turno en la agenda
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Box sx={{}}>...</Box>
      </Paper>
    </Box>
  );
}
