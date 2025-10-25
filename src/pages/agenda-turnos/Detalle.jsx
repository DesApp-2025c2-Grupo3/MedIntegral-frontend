import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import PrestadorDetailsSection from '../../components/agenda-turnos/PrestadorDetailsSection';
import HorariosDetailsSection from '../../components/agenda-turnos/HorariosDetailsSection';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';
import { AgendaProvider, useAgenda } from '../../context/AgendaContext';
import { usePageTitle } from '../../hooks/usePageTitle';

function DetalleAgendaContent() {
  const { agenda, loading, error } = useAgenda();

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!agenda) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title={`Agenda de turnos #${agenda.id}`}
        subtitle="Detalles con opción de edición"
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}>
          <PrestadorDetailsSection />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <HorariosDetailsSection />
        </Grid>
      </Grid>

      <AuditInfoSection
        createdAtFecha={agenda.createdAtFecha}
        createdAtHora={agenda.createdAtHora}
        updatedAtFecha={agenda.updatedAtFecha}
        updatedAtHora={agenda.updatedAtHora}
      />
    </Box>
  );
}

export default function DetalleAgendaTurnos() {
  usePageTitle('MedIntegral | Detalle de agenda de turnos');
  const { id } = useParams();
  const location = useLocation();

  return (
    <AgendaProvider idAgenda={id}>
      <DetalleAgendaContent />
      {location.search.includes('creacion=true') && (
        <SuccessSnackbar
          open
          message="Agenda de turnos cargada con éxito"
          onClose={() => {}}
        />
      )}
    </AgendaProvider>
  );
}
