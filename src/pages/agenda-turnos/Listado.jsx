import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoTurnosTable from '../../components/agenda-turnos/ListadoTurnosTable';
import api from '../../services/api';

export default function AgendaTurnosListado() {
  usePageTitle('MedIntegral | Listado de agendas de turnos');

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/agenda-turnos?search=${encodeURIComponent(query)}`
      );
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al buscar agendas:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <PageListHeader type="agenda-de-turnos" onSearch={handleSearch} />
      <ListadoTurnosTable rows={rows} loading={loading} />
    </Box>
  );
}
