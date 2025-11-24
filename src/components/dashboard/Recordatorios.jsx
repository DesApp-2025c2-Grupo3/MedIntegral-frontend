import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Link as MuiLink,
  Button,
  Chip,
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
      tipo: 'afiliados',
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
      tipo: 'prestadores',
      items: prestadoresSinAgenda.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        especialidades: p.especialidades || [],
        direccion: p.direccion || '',
        tipo: 'prestador',
      })),
      onOpenModal: () => setOpenPrestadoresModal(true),
    },
  ];

  const recordatoriosFiltrados = recordatorios.filter(
    (r) => r.items.length > 0
  );

  const hasRecordatorios = recordatoriosFiltrados.length > 0;

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
            transform: 'scale(1.01)',
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
              {recordatoriosFiltrados.map((rec, i) => {
                const mostrarVerMas = rec.items.length > 1;
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
                    }}
                  >
                    <CardContent
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: 20, opacity: 0.9 }} />
                        <Typography variant="body1" fontWeight={600}>
                          {rec.titulo}
                        </Typography>
                      </Box>

                      <Stack spacing={2} sx={{ mt: 1 }}>
                        {itemsVisibles.map((item, index) => (
                          <Box key={item.id}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 0.5,
                              }}
                            >
                              <CircleIcon
                                sx={{
                                  fontSize: 6,
                                  color: 'rgba(255,255,255,0.8)',
                                }}
                              />
                              <MuiLink
                                component={RouterLink}
                                to={`/${
                                  item.tipo === 'prestador'
                                    ? 'prestadores'
                                    : 'afiliados'
                                }/detalle/${item.id}`}
                                underline="hover"
                                sx={{
                                  color: '#fff',
                                  fontWeight: 600,
                                  fontSize: '0.95rem',
                                }}
                              >
                                {item.nombre}
                              </MuiLink>
                            </Box>

                            {item.tipo === 'prestador' &&
                              item.especialidades?.length > 0 && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    ml: 2,
                                    mb: 0.5,
                                  }}
                                >
                                  {item.especialidades.map((esp) => (
                                    <Chip
                                      key={esp}
                                      label={esp}
                                      size="small"
                                      sx={{
                                        color: '#fff',
                                        fontWeight: 500,
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}

                            {item.tipo === 'prestador' && (
                              <Typography
                                variant="body2"
                                sx={{ ml: 2, opacity: 0.9 }}
                              >
                                Dirección: {item.direccion || 'Sin dirección'}
                              </Typography>
                            )}

                            {item.tipo === 'afiliado' && (
                              <Typography
                                variant="body2"
                                sx={{ ml: 2, opacity: 0.9 }}
                              >
                                Fecha: {item.fecha}
                              </Typography>
                            )}

                            {index < itemsVisibles.length - 1 && (
                              <Box
                                sx={{
                                  height: 1,
                                  backgroundColor: 'rgba(255,255,255,0.2)',
                                  my: 1.5,
                                  ml: 1,
                                }}
                              />
                            )}
                          </Box>
                        ))}

                        {mostrarVerMas && (
                          <Button
                            variant="text"
                            size="small"
                            sx={{
                              color: '#fff',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
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
