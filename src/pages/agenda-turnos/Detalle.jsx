import PropTypes from 'prop-types';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import PrestadorDetailsSection from '../../components/agenda-turnos/PrestadorDetailsSection';
import HorariosDetailsSection from '../../components/agenda-turnos/HorariosDetailsSection';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';
import { AgendaProvider, useAgenda } from '../../context/AgendaContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useState } from 'react';

function DetalleAgendaContent({ onSuccess }) {
  const { agenda, loading } = useAgenda();

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title={`Agenda de turnos #${agenda.id}`}
        subtitle="Detalles con opción de edición"
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}>
          <PrestadorDetailsSection onSuccess={onSuccess} />
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

DetalleAgendaContent.propTypes = {
  onSuccess: PropTypes.func,
};

export default function DetalleAgendaTurnos() {
  usePageTitle('MedIntegral | Detalle de agenda de turnos');
  const { id } = useParams();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = (msg) => setSuccessMessage(msg);

  return (
    <AgendaProvider idAgenda={id}>
      <DetalleAgendaContent onSuccess={handleSuccess} />
      {(location.search.includes('creacion=true') || successMessage) && (
        <SuccessSnackbar
          open
          message={successMessage || 'Agenda de turnos cargada con éxito'}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </AgendaProvider>
  );
}
