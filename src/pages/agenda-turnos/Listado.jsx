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
  const [filters, setFilters] = useState({ textInputSearch: '' });

  const fetchAgendas = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries({
          ...filters,
          page: page + 1,
          limit: rowsPerPage,
        }).map(([key, val]) => [
          key,
          typeof val === 'object' ? val?.value || '' : val,
        ])
      );

      const { data } = await api.get('/agenda-turnos/search', { params });

      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error al obtener agendas:', err);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, rowsPerPage]);

  useEffect(() => {
    fetchAgendas();
  }, [fetchAgendas]);

  const handleSearch = (newFilters) => {
    if (!newFilters || Object.keys(newFilters).length === 0) {
      setFilters({ textInputSearch: '' });
      setPage(0);
      return;
    }

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPage(0);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
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
