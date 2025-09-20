import { Box, Divider } from '@mui/material';
import PrestadorSection from './PrestadorSection';
import HorariosSection from './HorariosSection';
import ButtonsSection from './ButtonsSection';
import MultiplesHorariosSection from './MultiplesHorariosSection';

export default function AltaTurnosForm() {
  return (
    <Box component="form" noValidate>
      <PrestadorSection />
      <Divider sx={{ my: 6 }} />
      <HorariosSection />
      <MultiplesHorariosSection />
      <Divider sx={{ my: 6 }} />
      <ButtonsSection />
    </Box>
  );
}
