import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import api from '../../services/api';
import { usePageTitle } from '../../hooks/usePageTitle';
import PrestadorInfo from '../../components/common/details/PrestadorInfo';
import HorariosAtencion from '../../components/common/details/HorariosAtencion';
import MetadataInfo from '../../components/common/details/MetadataInfo';

export default function DetalleAgendaTurnos() {
  usePageTitle('MedIntegral | Detalle de agenda de turnos');
  const { id } = useParams();
  const location = useLocation();

  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchAgendaDetalle = async () => {
      try {
        const { data } = await api.get(`/agenda-turnos/${id}`);
        setAgenda(data);
      } catch (err) {
        console.error('Error al obtener detalle de agenda:', err);
        setError('No se pudo obtener el detalle de la agenda.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgendaDetalle();
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
          <PrestadorInfo agenda={agenda} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <HorariosAtencion agenda={agenda} />
        </Grid>
      </Grid>

      <MetadataInfo agenda={agenda} />

      <SuccessSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Agenda de turnos cargada con éxito"
      />
    </Box>
  );
}
