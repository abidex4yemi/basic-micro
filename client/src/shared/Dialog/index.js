import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function AlertDialog({ showDialog, handleClose, title }) {
  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button
          onClick={() => handleClose({ answer: 'yes' })}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
