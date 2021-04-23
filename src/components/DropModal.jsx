import React from 'react';
import { Typography, Dialog, DialogContent, DialogTitle, Divider, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LabelForm from './forms/LabelForm';
import InputForm from './forms/InputForm';
import ButtonForm from './forms/ButtonForm';

export default function FormDialog({ setDroppedItemData, droppedItemData }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setDroppedItemData(null);
  };

  const FormLoader = () => {
    switch (droppedItemData.type) {
      case 'Label':
        return <LabelForm droppedItemData={droppedItemData} handleClose={handleClose} />;
      case 'Input':
        return <InputForm droppedItemData={droppedItemData} handleClose={handleClose} />;
      case 'Button':
        return <ButtonForm droppedItemData={droppedItemData} handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={{
          color: 'black',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px',
        }}
        >
          <Typography variant="h5" align="left">Edit {droppedItemData.type}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{ color: 'black' }} />
          </IconButton>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ paddingTop: 20, paddingBottom: 20 }}>
        <FormLoader />
      </DialogContent>
    </Dialog>
  );
}