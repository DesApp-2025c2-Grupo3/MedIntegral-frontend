import { Paper, Box } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import AltaTurnosForm from '../../components/agenda-turnos/AltaTurnosForm';
import { PrestadorProvider } from '../../context/PrestadorContext';
import { HorariosProvider } from '../../context/HorariosContext';
import { FormValidationProvider } from '../../context/FormValidationContext';

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
        <PrestadorProvider>
          <FormValidationProvider>
            <HorariosProvider>
              <AltaTurnosForm />
            </HorariosProvider>
          </FormValidationProvider>
        </PrestadorProvider>
      </Paper>
    </Box>
  );
}
