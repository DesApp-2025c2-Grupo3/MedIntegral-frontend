import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Stack,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PageHeader from '../../components/common/PageHeader';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import api from '../../services/api';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function TurnosDetalle() {
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

  const direccion = agenda.direccion
    ? `${agenda.direccion.calle} ${agenda.direccion.altura}${
        agenda.direccion.pisoDepto ? ', ' + agenda.direccion.pisoDepto : ''
      }, ${agenda.direccion.localidad}, ${agenda.direccion.provincia}`
    : 'Sin dirección especificada';

  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title="Detalle de agenda de turnos"
        subtitle={`Visualizando la agenda de turnos #${id}`}
      />

      <Grid container spacing={3} mt={1}>
        {/* Información del Prestador */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              height: '100%',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <LocalHospitalOutlinedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Información del Prestador
              </Typography>
            </Stack>

            <Typography>
              <strong>Prestador:</strong>{' '}
              {agenda.prestador?.nombre || agenda.prestador}
            </Typography>
            <Typography>
              <strong>Especialidad:</strong>{' '}
              {agenda.especialidad?.nombre || agenda.especialidad}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnOutlinedIcon fontSize="small" color="action" />
              <Typography>{direccion}</Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <CalendarMonthOutlinedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Horarios de Atención
              </Typography>
            </Stack>

            {agenda.horariosAtencion?.length > 0 ? (
              agenda.horariosAtencion.map((h, index) => (
                <Typography key={index}>
                  {h.dias?.join(', ')} — {h.horaInicio} a {h.horaFin} hs (
                  Duración: {h.duracion} min)
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">
                No hay horarios registrados
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <SuccessSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Agenda de turnos cargada con éxito"
      />
    </Box>
  );
}
