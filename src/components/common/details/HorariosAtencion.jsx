import PropTypes from 'prop-types';
import { Stack, Typography, Divider, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DetailsSection from './DetailsSection';

export default function HorariosAtencion({ agenda, onEdit }) {
  return (
    <DetailsSection
      title="Horarios de Atención"
      icon={CalendarMonthOutlinedIcon}
      onEdit={onEdit}
    >
      {agenda.horariosAtencion?.length > 0 ? (
        <Stack spacing={1.5}>
          {agenda.horariosAtencion.map((h, index) => (
            <Box key={index}>
              <Typography variant="body1" fontWeight={500}>
                {h.dias}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <AccessTimeOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {h.horarios}
                </Typography>
              </Stack>
              {index < agenda.horariosAtencion.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">
          No hay horarios registrados
        </Typography>
      )}
    </DetailsSection>
  );
}

HorariosAtencion.propTypes = {
  agenda: PropTypes.shape({
    horariosAtencion: PropTypes.arrayOf(
      PropTypes.shape({
        dias: PropTypes.string,
        horarios: PropTypes.string,
      })
    ),
  }).isRequired,
  onEdit: PropTypes.func,
};
