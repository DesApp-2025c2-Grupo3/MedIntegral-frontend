import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDashboard } from '../../context/DashboardContext';

export default function PrestadoresPorLocalidad() {
  const { prestadoresPorLocalidad } = useDashboard();
  const [openModal, setOpenModal] = useState(false);

  const { chartData, total } = useMemo(() => {
    if (!prestadoresPorLocalidad?.length) return { chartData: [], total: 0 };

    const total = prestadoresPorLocalidad.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );

    const top3 = prestadoresPorLocalidad.slice(0, 3);
    const otrosCount = prestadoresPorLocalidad
      .slice(3)
      .reduce((acc, item) => acc + item.cantidad, 0);

    const combined = [...top3];
    if (otrosCount > 0) {
      combined.push({
        localidad: 'Otros',
        provincia: '',
        cantidad: otrosCount,
      });
    }

    const chartData = combined.map((item, index) => ({
      id: index,
      value: ((item.cantidad / total) * 100).toFixed(1),
      cantidad: item.cantidad,
      label:
        item.localidad === 'Otros'
          ? 'Otros'
          : `${item.localidad}${item.provincia ? `, ${item.provincia}` : ''}`,
    }));

    return { chartData, total };
  }, [prestadoresPorLocalidad]);

  const fullData = useMemo(() => {
    if (!prestadoresPorLocalidad?.length) return [];
    const total = prestadoresPorLocalidad.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
    return prestadoresPorLocalidad.map((item, index) => ({
      id: index,
      value: ((item.cantidad / total) * 100).toFixed(1),
      label: `${item.localidad}${item.provincia ? `, ${item.provincia}` : ''}`,
    }));
  }, [prestadoresPorLocalidad]);

  const colors = ['#00B1EA', '#4CAF50', '#FFC107', '#F44336', '#FF8E00'];

  if (!chartData.length) return null;

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
            Prestadores por localidad
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <PieChart
              series={[
                {
                  data: chartData.map((d, i) => ({
                    id: d.id,
                    value: d.value,
                    color: colors[i % colors.length],
                  })),
                  innerRadius: 40,
                  outerRadius: 80,
                  paddingAngle: 3,
                  cornerRadius: 4,
                  label: { visible: false },
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'rgba(0,0,0,0.05)',
                  },
                },
              ]}
              width={180}
              height={200}
            />

            <Stack spacing={1.2} sx={{ ml: 2 }}>
              {chartData.map((item, i) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ minWidth: 160 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: colors[i % colors.length],
                      }}
                    />
                    <Typography variant="body2" color="text.primary">
                      {item.label}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={500}>
                    {item.value}%
                  </Typography>
                </Stack>
              ))}
              <Button
                variant="text"
                size="small"
                sx={{ mt: 1, textTransform: 'none', color: 'primary.main' }}
                onClick={() => setOpenModal(true)}
              >
                Ver más
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Distribución porcentual de prestadores según localidad
          </Typography>
        </CardContent>
      </Card>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h6">Prestadores por localidad</Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {total} prestadores
            </Typography>
          </Box>

          <IconButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <PieChart
              series={[
                {
                  data: fullData.map((d, i) => ({
                    id: d.id,
                    value: d.value,
                    color: colors[i % colors.length],
                  })),
                  innerRadius: 50,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 4,
                  label: { visible: false },
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: {
                    innerRadius: 40,
                    additionalRadius: -30,
                    color: 'rgba(0,0,0,0.05)',
                  },
                },
              ]}
              width={200}
              height={230}
            />

            <Stack spacing={1.2} sx={{ ml: 3 }}>
              {fullData.map((item, i) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ minWidth: 180 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: colors[i % colors.length],
                      }}
                    />
                    <Typography variant="body2" color="text.primary">
                      {item.label}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={500}>
                    {item.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

PrestadoresPorLocalidad.propTypes = {
  prestadoresPorLocalidad: PropTypes.arrayOf(
    PropTypes.shape({
      localidad: PropTypes.string.isRequired,
      provincia: PropTypes.string,
      cantidad: PropTypes.number.isRequired,
    })
  ),
};
