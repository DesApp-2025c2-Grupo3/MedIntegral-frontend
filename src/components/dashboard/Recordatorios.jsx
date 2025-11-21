import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
  Button,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { Link as RouterLink } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import AfiliadosRecordatorioModal from './modals/AfiliadosRecordatorioModal';
import PrestadoresRecordatorioModal from './modals/PrestadoresRecordatorioModal';

export default function Recordatorios() {
  const { afiliadosConBaja = [], prestadoresSinAgenda = [] } = useDashboard();

  const [openAfiliadosModal, setOpenAfiliadosModal] = useState(false);
  const [openPrestadoresModal, setOpenPrestadoresModal] = useState(false);

  const recordatorios = [
    {
      titulo: `${afiliadosConBaja.length} afiliado(s) con baja programada próximamente`,
      color: '#00B1EA',
      items: afiliadosConBaja.map((a) => ({
        id: a.id,
        nombre: a.nombre,
        fecha: a.fecha,
        tipo: 'afiliado',
      })),
      onOpenModal: () => setOpenAfiliadosModal(true),
    },
    {
      titulo: `${prestadoresSinAgenda.length} prestador(es) sin agenda de turnos definida`,
      color: '#00B1EA',
      items: prestadoresSinAgenda.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        detalle: p.detalle,
        tipo: 'prestador',
      })),
      onOpenModal: () => setOpenPrestadoresModal(true),
    },
  ];

  const hasRecordatorios = recordatorios.some(
    (r) => Array.isArray(r.items) && r.items.length > 0
  );

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Recordatorios
          </Typography>

          {hasRecordatorios ? (
            <Stack spacing={2}>
              {recordatorios.map((rec, i) => {
                const mostrarVerMas = rec.items.length > 4;
                const itemsVisibles = mostrarVerMas
                  ? rec.items.slice(0, 4)
                  : rec.items;

                return (
                  <Card
                    key={i}
                    sx={{
                      backgroundColor: rec.color,
                      color: '#fff',
                      borderRadius: 3,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: 20, opacity: 0.9 }} />
                        <Typography variant="body1" fontWeight={600}>
                          {rec.titulo}
                        </Typography>
                      </Box>

                      <Stack sx={{ pl: 3 }} spacing={0.5}>
                        {itemsVisibles.map((item) => (
                          <Box
                            key={`${rec.titulo}-${item.id}`}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CircleIcon sx={{ fontSize: 6, opacity: 0.8 }} />
                            <MuiLink
                              component={RouterLink}
                              to={`/${item.tipo === 'prestador' ? 'prestadores' : 'afiliados'}/detalle/${item.id}`}
                              underline="hover"
                              sx={{
                                color: '#fff',
                                fontWeight: 500,
                                textDecoration: 'underline',
                              }}
                            >
                              {item.nombre}
                            </MuiLink>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              {' - '}
                              {item.detalle || item.fecha}
                            </Typography>
                          </Box>
                        ))}

                        {mostrarVerMas && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{ color: '#fff', textTransform: 'none', mt: 1 }}
                            onClick={rec.onOpenModal}
                          >
                            Ver más
                          </Button>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          ) : (
            <Typography
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <InfoOutlinedIcon fontSize="small" />
              No hay recordatorios pendientes.
            </Typography>
          )}
        </CardContent>
      </Card>

      <AfiliadosRecordatorioModal
        open={openAfiliadosModal}
        onClose={() => setOpenAfiliadosModal(false)}
        items={afiliadosConBaja}
      />

      <PrestadoresRecordatorioModal
        open={openPrestadoresModal}
        onClose={() => setOpenPrestadoresModal(false)}
        items={prestadoresSinAgenda}
      />
    </>
  );
}
