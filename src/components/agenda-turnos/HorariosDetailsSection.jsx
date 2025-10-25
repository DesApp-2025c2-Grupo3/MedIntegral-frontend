import PropTypes from 'prop-types';
import { Stack, Typography, Divider, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DetailsSection from '../common/details/DetailsSection';

export default function HorariosDetailsSection({ horariosAtencion, onEdit }) {
  return (
    <DetailsSection
      title="Horarios de Atención"
      icon={CalendarMonthOutlinedIcon}
      onEdit={onEdit}
    >
      {horariosAtencion?.length > 0 ? (
        <Stack spacing={1.5}>
          {horariosAtencion.map((h, index) => (
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
              {index < horariosAtencion.length - 1 && (
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

HorariosDetailsSection.propTypes = {
  horariosAtencion: PropTypes.arrayOf(
    PropTypes.shape({
      dias: PropTypes.string,
      horarios: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func,
};
