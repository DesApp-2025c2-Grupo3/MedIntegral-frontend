import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import { usePageTitle } from '../../hooks/usePageTitle';
import { AfiliadoProvider, useAfiliado } from '../../context/AfiliadoContext';
import PageDetailHeader from '../../components/common/details/PageDetailHeader';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';
import DatosPersonalesDetailsSection from '../../components/afiliados/DatosPersonalesDetailsSection';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CoberturaDetailsSection from '../../components/afiliados/CoberturaDetailsSection';
import BajaAfiliadoModal from '../../components/afiliados/modals/BajaAfiliadoModal';

function DetalleAfiliadoContent() {
  const { afiliado, loading } = useAfiliado();
  const { id } = useParams();
  const navigate = useNavigate();
  const [bajaModalOpen, setBajaModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !afiliado) {
      navigate('/404', { replace: true });
    }
  }, [loading, afiliado, navigate]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (!afiliado) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <PageDetailHeader
        type="afiliado"
        id={id}
        nombre={`${afiliado.nombre}`}
        onDelete={() => setBajaModalOpen(true)}
        customDelete={true}
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatosPersonalesDetailsSection />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CoberturaDetailsSection />
        </Grid>
      </Grid>

      <AuditInfoSection
        createdAtFecha={afiliado.createdAtFecha}
        createdAtHora={afiliado.createdAtHora}
        updatedAtFecha={afiliado.updatedAtFecha}
        updatedAtHora={afiliado.updatedAtHora}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BajaAfiliadoModal
          open={bajaModalOpen}
          onClose={() => setBajaModalOpen(false)}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default function DetalleAfiliado() {
  usePageTitle('MedIntegral | Detalle de afiliado y grupo familiar');

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
        `/afiliados/detalle/${id}`
      );
    }
  }, [location, id]);

  return (
    <AfiliadoProvider idAfiliado={id}>
      <DetalleAfiliadoContent />

      <SuccessSnackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        message="Afiliado creado con éxito"
      />
    </AfiliadoProvider>
  );
}
