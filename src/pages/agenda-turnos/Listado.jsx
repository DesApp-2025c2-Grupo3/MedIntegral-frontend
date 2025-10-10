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

  const fetchAgendas = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/agenda-turnos', {
        params: {
          search: searchQuery,
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch {
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, rowsPerPage]);

  useEffect(() => {
    fetchAgendas();
  }, [fetchAgendas]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
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
