import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getAgendaTurnoById } from '../../services/agendaTurnos';
import PrestadorDetailsSection from '../../components/agenda-turnos/PrestadorDetailsSection';
import HorariosDetailsSection from '../../components/agenda-turnos/HorariosDetailsSection';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';

export default function DetalleAgendaTurnos() {
  usePageTitle('MedIntegral | Detalle de agenda de turnos');
  const { id } = useParams();
  const location = useLocation();

  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const agendaData = await getAgendaTurnoById(id);
        setAgenda(agendaData);
      } catch (err) {
        console.error('Error al obtener detalle de agenda:', err);
        setError('No se pudo obtener el detalle de la agenda.');
      } finally {
        setLoading(false);
      }
    };

    loadAgenda();
  }, [id]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('creacion') === 'true') {
      setOpenSnackbar(true);
    }
  }, [location]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!agenda) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title="Detalle de agenda de turnos"
        subtitle={`Visualizando la agenda de turnos #${id}`}
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}>
          <PrestadorDetailsSection
            prestador={agenda.prestador}
            especialidad={agenda.especialidad}
            direccion={agenda.direccion}
            onEdit={() => {}}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <HorariosDetailsSection
            horariosAtencion={agenda.horariosAtencion}
            onEdit={() => {}}
          />
        </Grid>
      </Grid>

      <AuditInfoSection
        createdAtFecha={agenda.createdAtFecha}
        createdAtHora={agenda.createdAtHora}
        updatedAtFecha={agenda.updatedAtFecha}
        updatedAtHora={agenda.updatedAtHora}
      />

      <SuccessSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Agenda de turnos cargada con éxito"
      />
    </Box>
  );
}
