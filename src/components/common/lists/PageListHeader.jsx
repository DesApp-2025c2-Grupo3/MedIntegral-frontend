import { Box, Grid, Typography, InputBase, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import './PageListHeader.css';

const headerConfig = {
  'agenda-de-turnos': {
    title: 'Agendas de turnos',
    placeholder: 'Buscar por prestador, especialidad...',
  },
  prestador: {
    title: 'Prestadores',
    placeholder: 'Buscar por nombre, especialidad, CUIT/CUIL...',
  },
  afiliado: {
    title: 'Afiliados',
    placeholder: 'Buscar por nombre, DNI o número de afiliado...',
  },
};

export default function PageListHeader({ type }) {
  const config = headerConfig[type] || headerConfig['agenda-de-turnos'];

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
              placeholder={config.placeholder}
              inputProps={{
                'aria-label': config.placeholder,
              }}
              className="page-list-input"
            />
          </Paper>

          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filtros
          </Button>

          <Button variant="contained" startIcon={<AddIcon />}>
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1.5 }}>
        Resultados de la búsqueda
      </Typography>
    </Box>
  );
}

PageListHeader.propTypes = {
  type: PropTypes.oneOf(['agenda-de-turnos', 'prestador', 'afiliado'])
    .isRequired,
};
