import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SuccessSnackbar from '../../components/common/SuccessSnackbar';

export default function AfiliadosEdicion() {
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('creacion') === 'true') {
      setOpen(true);
    }
  }, [location]);

  return (
    <>
      <Typography variant="h5">Edición de Afiliado (ID: {id})</Typography>
      <SuccessSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message="Afiliado creado con éxito"
      />
    </>
  );
}
