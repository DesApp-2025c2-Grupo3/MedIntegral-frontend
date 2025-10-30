import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';

import ConfirmCancelDialog from '../forms/ConfirmCancelDialog';
import { detailHeaderConfig } from '../../../utils/detailHeaderConfig';
import { deleteAgendaTurnos } from '../../../services/agendaTurnos';
import { deletePrestador } from '../../../services/prestadores';
import { deleteAfiliado } from '../../../services/afiliado';

const deleteServices = {
  deleteAgendaTurnos,
  deletePrestador,
  deleteAfiliado,
};

export default function PageDetailHeader({ type, id, onDeleted }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const config = detailHeaderConfig[type];
  if (!config || !id) return null;

  const title = config.title(id);
  const subtitle = config.subtitle?.(id);
  const deleteFn = deleteServices[config.deleteService];

  const handleConfirmDelete = async () => {
    try {
      await deleteFn(id);
      onDeleted?.();
      navigate(config.redirectTo);
    } catch (error) {
      console.error('Error al eliminar', error);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid xs={12} md="auto">
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Grid>

        <Grid xs={12} md="auto">
          <Button
            variant="outlined"
            color="error"
            sx={{ textTransform: 'none' }}
            startIcon={<DeleteOutlineIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Dar de baja
          </Button>
        </Grid>
      </Grid>

      <ConfirmCancelDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        title={config.deleteModal.title}
        message={config.deleteModal.message(id)}
      />
    </Box>
  );
}

PageDetailHeader.propTypes = {
  type: PropTypes.oneOf(['agenda-de-turnos', 'prestador', 'afiliado'])
    .isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDeleted: PropTypes.func,
};
