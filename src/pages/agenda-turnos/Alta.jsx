import { Paper, Box } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import AltaTurnosForm from '../../components/agenda-turnos/AltaTurnosForm';
import { AltaTurnosProvider } from '../../context/AltaTurnosContext';

export default function AltaTurnos() {
  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title="Alta de turnos"
        subtitle="Ingrese los datos para crear un nuevo turno en la agenda"
      />
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          mt: 3,
        }}
      >
        <AltaTurnosProvider>
          <AltaTurnosForm />
        </AltaTurnosProvider>
      </Paper>
    </Box>
  );
}
