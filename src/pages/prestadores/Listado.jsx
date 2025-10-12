import Box from '@mui/material/Box';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoPrestadoresTable from '../../components/prestadores/ListadoPrestadoresTable';

export default function PrestadoresListado() {
  usePageTitle('MedIntegral | Listado de prestadores');

  return (
    <Box sx={{ mb: 2 }}>
      <PageListHeader type="prestador" />

      <ListadoPrestadoresTable />
    </Box>
  );
}
