import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Card,
  CardContent,
  Button,
  Collapse,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import { AfiliadoProvider, useAfiliado } from '../../context/AfiliadoContext';
import DatosPersonalesDetailsSection from './DatosPersonalesDetailsSection';
import SituacionesTerapeuticasDetailsSection from './SituacionesTerapeuticasDetailsSection';
import DatosContactoDetailsSection from './DatosContactoDetailsSection';
import DireccionDetailsSection from './DireccionDetailsSection';
import PropTypes from 'prop-types';

function MiembroFamiliarContent({ miembro }) {
  const { afiliado } = useAfiliado();
  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState(null);

  if (!afiliado) return null;

  const handleToastClose = () => setToast(null);

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: expanded ? 2 : 0,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="medium">
                {afiliado.nombre} {afiliado.apellido}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}
              >
                <Chip
                  label={miembro.parentesco?.relacion}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                {afiliado.vigenciaFin ? (
                  <Chip label="Inactivo" size="small" color="error" />
                ) : (
                  <Chip label="Activo" size="small" color="success" />
                )}
              </Stack>
            </Box>

            <Button
              endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setExpanded(!expanded)}
              size="small"
            >
              {expanded ? 'Menos' : 'Más'}
            </Button>
          </Box>

          <Collapse in={expanded}>
            <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ mb: 3 }}>
                <DatosPersonalesDetailsSection />
              </Box>

              {afiliado.situacionesTerapeuticas?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SituacionesTerapeuticasDetailsSection />
                </Box>
              )}

              {(afiliado.emails?.length > 0 ||
                afiliado.telefonos?.length > 0) && (
                <Box sx={{ mb: 3 }}>
                  <DatosContactoDetailsSection />
                </Box>
              )}

              {afiliado.domicilios?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <DireccionDetailsSection />
                </Box>
              )}
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {toast && (
        <Snackbar
          key={toast.key}
          open
          autoHideDuration={2000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleToastClose}
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
            sx={{ color: 'white', fontWeight: 200 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default function MiembroFamiliarDetails({ miembro, numero }) {
  const miembroComoAfiliado = {
    ...miembro,
    id: miembro.id,
    tipoDocumento: miembro.tipoDocumento || {},
    Contrato: miembro.Contrato || { plan: miembro.cobertura || {} },
    situacionesTerapeuticas: miembro.situacionesTerapeuticas || [],
    domicilios: miembro.domicilios || [],
    emails: miembro.emails || [],
    telefonos: miembro.telefonos || [],
  };

  return (
    <AfiliadoProvider
      idAfiliado={miembro.id}
      afiliadoData={miembroComoAfiliado}
    >
      <MiembroFamiliarContent miembro={miembro} numero={numero} />
    </AfiliadoProvider>
  );
}

MiembroFamiliarContent.propTypes = {
  miembro: PropTypes.object.isRequired,
};

MiembroFamiliarDetails.propTypes = {
  miembro: PropTypes.object.isRequired,
  numero: PropTypes.number.isRequired,
};
