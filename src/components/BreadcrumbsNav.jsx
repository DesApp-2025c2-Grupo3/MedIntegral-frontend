import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const routeNameMap = {
  'agenda-turnos': 'Agenda de turnos',
  prestadores: 'Prestadores',
  afiliados: 'Afiliados',
  listado: 'Listado',
  alta: 'Alta',
  edicion: 'Edición',
};

export default function BreadcrumbsNav() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link
        component={RouterLink}
        underline="hover"
        color="text.secondary"
        to="/"
        fontWeight="medium"
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = routeNameMap[value] || value;

        return isLast ? (
          <Typography key={to} color="text.secondary" fontWeight="medium">
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            underline="hover"
            color="text.secondary"
            to={to}
            fontWeight="medium"
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
