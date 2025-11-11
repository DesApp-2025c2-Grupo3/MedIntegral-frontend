import { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import PageHeader from '../components/common/PageHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import LoadingOverlay from '../components/common/LoadingOverlay';

import {
  getAfiliadosTotales,
  getPrestadoresTotales,
  getAgendasTotales,
  getCantidadEspecialidades,
} from '../services/dashboard';

export default function AfiliadosAlta() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [afiliados, prestadores, agendas, especialidades] =
        await Promise.all([
          getAfiliadosTotales(),
          getPrestadoresTotales(),
          getAgendasTotales(),
          getCantidadEspecialidades(),
        ]);

      setStats([
        {
          title: 'Afiliados totales',
          value: afiliados,
          color: 'linear-gradient(360deg, #0077C8 0%, #00B1EA 100%)',
          textColor: '#fff',
          link: '/afiliados/turnos',
        },
        {
          title: 'Prestadores totales',
          value: prestadores,
          color: '#fff',
          textColor: '#000',
          link: '/prestadores/listado',
        },
        {
          title: 'Agendas de turnos totales',
          value: agendas,
          color: '#fff',
          textColor: '#000',
          link: '/agenda-turnos/listado',
        },
        {
          title: 'Especialidades',
          value: especialidades,
          color: '#fff',
          textColor: '#000',
          link: null,
        },
      ]);
    } catch (error) {
      console.error('Error al obtener estadísticas del dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <Box sx={{ mt: 2, position: 'relative' }}>
      <LoadingOverlay open={loading} />

      <PageHeader
        title="Dashboard"
        subtitle="Un resumen actualizado de lo más importante en MedIntegral Administrativo"
      />

      {!loading && <DashboardStats stats={stats} />}
    </Box>
  );
}
