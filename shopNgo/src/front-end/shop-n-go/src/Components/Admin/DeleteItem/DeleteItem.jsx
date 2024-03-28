import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteItem({ product, open, handleClose, onConfirmDelete }) {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`هل أنت متأكد من رغبتك في حذف العنصر ${product.name_AR}؟`}
            <br />
            {`لا يمكن التراجع عن هذا الإجراء`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button
            onClick={() => {
              onConfirmDelete(true); // Inform parent component to delete the item
              handleClose();
            }}
            autoFocus
            style={{ color: "red" }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeleteItem;
