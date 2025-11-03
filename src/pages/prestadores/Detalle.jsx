import { useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PageDetailHeader from '../../components/common/details/PageDetailHeader';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import {
  PrestadorProvider,
  usePrestador,
} from '../../context/PrestadorContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useEffect } from 'react';

function DetallePrestadorContent() {
  const { prestador, loading } = usePrestador();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !prestador) {
      navigate('/404', { replace: true });
    }
  }, [loading, prestador, navigate]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (!prestador) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <PageDetailHeader type="prestador" id={id} />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}></Grid>
        <Grid size={{ xs: 12 }}></Grid>
      </Grid>

      <AuditInfoSection
        createdAtFecha={prestador.createdAtFecha}
        createdAtHora={prestador.createdAtHora}
        updatedAtFecha={prestador.updatedAtFecha}
        updatedAtHora={prestador.updatedAtHora}
      />
    </Box>
  );
}

export default function DetallePrestador() {
  usePageTitle('MedIntegral | Detalle del prestador');

  const { id } = useParams();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('created') === 'true') {
      setShowSuccess(true);
      window.history.replaceState(
        {},
        document.title,
        `/prestadores/detalle/${id}`
      );
    }
  }, [location, id]);

  return (
    <PrestadorProvider idPrestador={id}>
      <DetallePrestadorContent />

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Prestador creado con éxito"
      />
    </PrestadorProvider>
  );
}
