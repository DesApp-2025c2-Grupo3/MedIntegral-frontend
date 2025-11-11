import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';
import { usePageTitle } from '../../hooks/usePageTitle';
import { AfiliadoProvider, useAfiliado } from '../../context/AfiliadoContext';
import PageDetailHeader from '../../components/common/details/PageDetailHeader';
import AuditInfoSection from '../../components/common/details/AuditInfoSection';

function DetalleAfiliadoContent() {
  const { afiliado, loading } = useAfiliado();
  const { id } = useParams();
  const navigate = useNavigate();

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
        //Agregar onDelete, modal para baja
      />

      <Grid container spacing={3} mt={1}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
            <h3>Datos del Afiliado (Vista provisoria)</h3>
            <p>
              <strong>Nombre:</strong> {afiliado.nombre} {afiliado.apellido}
            </p>
            <p>
              <strong>Documento:</strong> {afiliado.numeroDocumento}
            </p>
            <p>
              <strong>Vigencia:</strong> {afiliado.vigenciaInicio}
            </p>
          </Box>
        </Grid>
      </Grid>

      <AuditInfoSection
        createdAtFecha={afiliado.createdAtFecha}
        createdAtHora={afiliado.createdAtHora}
        updatedAtFecha={afiliado.updatedAtFecha}
        updatedAtHora={afiliado.updatedAtHora}
      />
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
        onClose={() => setShowSuccess(false)}
        message="Afiliado creado con éxito"
      />
    </AfiliadoProvider>
  );
}
