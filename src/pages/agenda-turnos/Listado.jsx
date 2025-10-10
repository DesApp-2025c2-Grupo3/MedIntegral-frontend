import { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoTurnosTable from '../../components/agenda-turnos/ListadoTurnosTable';
import api from '../../services/api';

export default function AgendaTurnosListado() {
  usePageTitle('MedIntegral | Listado de agendas de turnos');

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAgendas = useCallback(async (query, pageNumber, limit) => {
    setLoading(true);
    try {
      const { data } = await api.get('/agenda-turnos', {
        params: {
          search: query || '',
          page: pageNumber + 1,
          limit,
        },
      });
      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error al obtener las agendas:', err);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgendas(searchQuery, page, rowsPerPage);
  }, [fetchAgendas, searchQuery, page, rowsPerPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
    fetchAgendas(query, 0, rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchAgendas(searchQuery, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    fetchAgendas(searchQuery, 0, newLimit);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <PageListHeader type="agenda-de-turnos" onSearch={handleSearch} />
      <ListadoTurnosTable
        rows={rows}
        loading={loading}
        page={page}
        total={total}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
