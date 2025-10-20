import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
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

  const formatearDias = (dias = []) => {
    if (!Array.isArray(dias)) return '';
    if (dias.length === 1) return dias[0];
    if (dias.length === 2) return `${dias[0]} y ${dias[1]}`;
    const ultimosDos = dias.slice(-2).join(' y ');
    return `${dias.slice(0, -2).join(', ')}, ${ultimosDos}`;
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  const formatearHora = (fecha) =>
    new Date(fecha).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Box sx={{ mt: 2 }}>
      <PageHeader
        title="Detalle de agenda de turnos"
        subtitle={`Visualizando la agenda de turnos #${id}`}
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              height: '100%',
            }}
          >
            <Tooltip title="Editar información del prestador">
              <IconButton
                size="small"
                color="primary"
                sx={{ position: 'absolute', top: 10, right: 10 }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

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

            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <LocationOnOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2">{direccion}</Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              height: '100%',
            }}
          >
            <Tooltip title="Editar horarios de atención">
              <IconButton
                size="small"
                color="primary"
                sx={{ position: 'absolute', top: 10, right: 10 }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <CalendarMonthOutlinedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Horarios de Atención
              </Typography>
            </Stack>

            {agenda.horariosAtencion?.length > 0 ? (
              <Stack spacing={1.5}>
                {agenda.horariosAtencion.map((h, index) => (
                  <Box key={index}>
                    <Typography variant="body1" fontWeight={500}>
                      {formatearDias(h.dias)}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={1}
                    >
                      <AccessTimeOutlinedIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {h.horaInicio} a {h.horaFin} hs — Duración por turno:{' '}
                        {h.duracion} min
                      </Typography>
                    </Stack>
                    {index < agenda.horariosAtencion.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">
                No hay horarios registrados
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 4,
          color: 'text.secondary',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          spacing={{ xs: 1, md: 2 }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <EventOutlinedIcon fontSize="small" />
            <Typography variant="caption">
              Creado el {formatearFecha(agenda.createdAt)} —{' '}
              {formatearHora(agenda.createdAt)} hs
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HistoryOutlinedIcon fontSize="small" />
            <Typography variant="caption">
              Última modificación: {formatearFecha(agenda.updatedAt)} —{' '}
              {formatearHora(agenda.updatedAt)} hs
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <SuccessSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Agenda de turnos cargada con éxito"
      />
    </Box>
  );
}
