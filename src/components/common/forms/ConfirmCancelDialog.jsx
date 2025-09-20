import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function ConfirmCancelDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-cancel-title"
      aria-describedby="confirm-cancel-description"
    >
      <DialogTitle id="confirm-cancel-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-cancel-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Volver
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmCancelDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

ConfirmCancelDialog.defaultProps = {
  title: '¿Cancelar?',
  message: 'Si cancelás ahora, se perderán los cambios realizados.',
};
