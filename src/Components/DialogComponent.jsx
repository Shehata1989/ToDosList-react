/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";


const DialogComponent = ({ open, handleClose, title, content, onConfirm }) => {

  
  if (!open) return null;
  return (
    <Dialog open={open} onClose={handleClose} disableRestoreFocus>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DialogComponent);
