import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Link,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableHeader from '../common/lists/TableHeader';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'prestador', label: 'Nombre del prestador' },
  { id: 'especialidad', label: 'Especialidad' },
  { id: 'horarios', label: 'Horarios' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'duracion', label: 'Duración de turnos' },
];

export default function AgendasTable({ rows = [], loading = false }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('prestador');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: 2,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Cargando resultados...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No se encontraron resultados.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      <Link
                        href="#"
                        underline="always"
                        color="text.primary"
                        sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        {row.prestador}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {row.especialidad}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {row.horarios.map((h, i) => (
                        <Typography key={i} fontSize="0.9rem">
                          {h}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            fontSize: 18,
                            color: 'text.secondary',
                            mt: 0.3,
                          }}
                        />
                        <Typography fontSize="0.9rem">
                          {row.direccion}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.9rem' }}>
                      {row.duracion}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!loading && rows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        )}
      </Paper>
    </Box>
  );
}

AgendasTable.propTypes = {
  rows: PropTypes.array,
  loading: PropTypes.bool,
};
