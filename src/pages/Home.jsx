import { Box, Grid } from '@mui/material';
import PageHeader from '../components/common/PageHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import PrestadoresPorLocalidad from '../components/dashboard/PrestadoresPorLocalidad';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

function HomeContent() {
  const { stats, loading } = useDashboard();

  return (
    <Box sx={{ mt: 2, position: 'relative' }}>
      <LoadingOverlay open={loading} />

      <PageHeader
        title="Dashboard"
        subtitle="Un resumen actualizado de lo más importante en MedIntegral Administrativo"
      />

      {!loading && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }} gap={3}>
            <DashboardStats stats={stats} />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <PrestadoresPorLocalidad />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default function Home() {
  return (
    <DashboardProvider>
      <HomeContent />
    </DashboardProvider>
  );
}
