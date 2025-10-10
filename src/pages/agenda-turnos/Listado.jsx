import { Box } from '@mui/material';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoTurnosTable from '../../components/agenda-turnos/ListadoTurnosTable';

export default function AgendaTurnosListado() {
  usePageTitle('MedIntegral | Listado de agendas de turnos');

  return (
    <Box sx={{ mt: 2 }}>
      <PageListHeader type="agenda-de-turnos" />
      <ListadoTurnosTable />
    </Box>
  );
}
