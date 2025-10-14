import Box from '@mui/material/Box';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoAfiliadosTable from '../../components/afiliados/ListadoAfiliadosTable';

export default function PrestadoresListado() {
  usePageTitle('MedIntegral | Listado de prestadores');

  return (
    <Box sx={{ mb: 2 }}>
      <PageListHeader type="afiliado" />

      <ListadoAfiliadosTable />
    </Box>
  );
}
