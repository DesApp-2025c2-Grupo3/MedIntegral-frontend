import { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, InputBase, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PageListHeader.css';
import FiltrosModalBase from './FiltrosModalBase';
import { filtrosConfig } from '../../../utils/filtrosConfig';

const headerConfig = {
  'agenda-de-turnos': {
    title: 'Agendas de turnos',
    placeholder: 'Buscar por prestador, especialidad...',
    addLink: '/agenda-turnos/alta',
  },
  prestador: {
    title: 'Prestadores',
    placeholder: 'Buscar por nombre, especialidad, CUIT/CUIL...',
    addLink: '/prestadores/alta',
  },
  afiliado: {
    title: 'Afiliados',
    placeholder: 'Buscar por nombre, DNI o número de afiliado...',
    addLink: '/afiliados/alta',
  },
};

export default function PageListHeader({ type, onSearch }) {
  const config = headerConfig[type] || headerConfig['agenda-de-turnos'];
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const lastSearchRef = useRef('');

  useEffect(() => {
    if (onSearch) onSearch({ textInputSearch: '' });
  }, []);

  useEffect(() => {
    if (!onSearch) return;
    const handler = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== lastSearchRef.current) {
        lastSearchRef.current = trimmed;
        onSearch({ textInputSearch: trimmed, ...filterValues });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleFilterApply = (values) => {
    setOpenFilter(false);

    if (values === null) return;

    if (values.__clearFilters) {
      setFilterValues({});
      onSearch({ textInputSearch: searchTerm.trim() });
      return;
    }

    if (Object.keys(values).length === 0) {
      setFilterValues({});
      onSearch({ textInputSearch: searchTerm.trim() });
      return;
    }

    setFilterValues(values);
    onSearch({ textInputSearch: searchTerm.trim(), ...values });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 'auto' }}>
          <Typography variant="h4" fontWeight="bold">
            {config.title}
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, md: 12, lg: 7 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', lg: 'flex-end' },
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', sm: 350 },
              px: 1,
            }}
          >
            <SearchIcon
              fontSize="small"
              sx={{ color: 'text.secondary', mr: 1 }}
            />
            <InputBase
              id={`search-${type}`}
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSearch({
                    textInputSearch: searchTerm.trim(),
                    ...filterValues,
                  });
                }
              }}
              placeholder={config.placeholder}
              inputProps={{ 'aria-label': config.placeholder }}
              className="page-list-input"
            />
          </Paper>

          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => setOpenFilter(true)}
          >
            Filtros
          </Button>

          <Button
            variant="contained"
            component={RouterLink}
            to={config.addLink}
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1.5 }}>
        Resultados de la búsqueda
      </Typography>

      <FiltrosModalBase
        open={openFilter}
        onClose={handleFilterApply}
        fields={filtrosConfig[type]?.fields}
        validateFn={filtrosConfig[type]?.validateFn}
      />
    </Box>
  );
}

PageListHeader.propTypes = {
  type: PropTypes.oneOf(['agenda-de-turnos', 'prestador', 'afiliado'])
    .isRequired,
  onSearch: PropTypes.func,
};
