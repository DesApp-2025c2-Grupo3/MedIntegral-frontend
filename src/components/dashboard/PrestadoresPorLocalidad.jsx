import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDashboard } from '../../context/DashboardContext';

export default function PrestadoresPorLocalidad() {
  const { prestadoresPorLocalidad } = useDashboard();

  if (!prestadoresPorLocalidad?.length) {
    return null;
  }

  const data = prestadoresPorLocalidad.map((item, index) => ({
    id: index,
    value: item.cantidad,
    label: `${item.localidad}, ${item.provincia}`,
  }));

  const colors = ['#0077C8', '#00B1EA', '#FFB703', '#FB8500', '#8B5CF6'];

  return (
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
      <CardContent>
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
                data: data.map((d, i) => ({
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

          <Stack spacing={1.5} sx={{ ml: 2 }}>
            {data.map((item, i) => (
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
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Distribución porcentual de prestadores según localidad
        </Typography>
      </CardContent>
    </Card>
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
