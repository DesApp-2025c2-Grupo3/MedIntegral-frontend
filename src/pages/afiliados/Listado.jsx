import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import PageListHeader from '../../components/common/lists/PageListHeader';
import { usePageTitle } from '../../hooks/usePageTitle';
import ListadoAfiliadosTable from '../../components/afiliados/ListadoAfiliadosTable';
import api from '../../services/api';

export default function PrestadoresListado() {
  usePageTitle('MedIntegral | Listado de prestadores');

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({ textInputSearch: '' });

  const fetchAfiliados = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries({
          ...filters,
          page: page + 1,
          limit: rowsPerPage,
        }).map(([keyframes, val]) => [
          keyframes,
          typeof val === 'object' ? val?.value || '' : val,
        ])
      );

      const { data } = await api.get('/afiliados', { params });

      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error al obtener afiliados:', err);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, rowsPerPage]);

  useEffect(() => {
    fetchAfiliados();
  }, [fetchAfiliados]);

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
    <Box sx={{ mb: 2 }}>
      <PageListHeader type="afiliados" onSearch={handleSearch} />

      <ListadoAfiliadosTable
        rows={rows}
        loading={loading}
        total={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
