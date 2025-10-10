import * as React from 'react';
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

const rows = [
  {
    id: 1,
    prestador: 'Clínica Modelo de Morón',
    especialidad: 'Cardiología',
    horarios: ['Lunes 10hs - 20hs', 'Martes 10hs - 18hs'],
    direccion: 'Av. Rivadavia 8900, Morón, Buenos Aires',
    duracion: '25 minutos',
  },
  {
    id: 2,
    prestador: 'Clínica Modelo de Morón',
    especialidad: 'Obstetricia',
    horarios: ['Miércoles 8hs - 17hs'],
    direccion: 'Av. Rivadavia 8900, Morón, Buenos Aires',
    duracion: '30 minutos',
  },
  {
    id: 3,
    prestador: 'Clínica Mariano Moreno',
    especialidad: 'Pediatría',
    horarios: [
      'Lunes 8hs - 12hs',
      'Martes 8hs - 12hs',
      'Miércoles 10hs - 14hs',
      'Jueves 8hs - 12hs',
      'Viernes 8hs - 12hs',
    ],
    direccion: 'Av. San Martín 1234, Moreno, Buenos Aires',
    duracion: '20 minutos',
  },
  {
    id: 4,
    prestador: 'Dr. Sigmund Freud',
    especialidad: 'Psiquiatría',
    horarios: ['Martes 18hs - 22hs', 'Jueves 14hs - 20hs'],
    direccion: 'Av. Boulogne 5678, Boulogne, Buenos Aires',
    duracion: '10 minutos',
  },
];

export default function AgendasTable() {
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
    [order, orderBy, page, rowsPerPage]
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
              {visibleRows.map((row) => (
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
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
                    >
                      <LocationOnIcon
                        sx={{ fontSize: 18, color: 'text.secondary', mt: 0.3 }}
                      />
                      <Typography fontSize="0.9rem">{row.direccion}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>
                    {row.duracion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      </Paper>
    </Box>
  );
}
