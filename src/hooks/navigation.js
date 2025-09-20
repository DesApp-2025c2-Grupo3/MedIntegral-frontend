import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook que devuelve una función navigateToListado para la entidad actual.
 * Detecta el "entity" desde la URL (primer segmento del pathname).
 */
export const useNavigateToListado = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const entity = location.pathname.split('/')[1];

  const navigateToListado = (status) => {
    const basePath = `/${entity}/listado`;
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    navigate(`${basePath}${query}`);
  };

  return navigateToListado;
};
