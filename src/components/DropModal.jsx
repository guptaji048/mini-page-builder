import React, { useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogContent, DialogTitle, Divider, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function FormDialog({ setDroppedItemData, droppedItemData }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setDroppedItemData(null);
  };

  const onSubmit = async (e, typeDetails) => {
    e.preventDefault();
    const storedData = await JSON.parse(localStorage.getItem("DataBlocks"));
    const newData = storedData === null ? [typeDetails] : [...storedData, typeDetails];
    localStorage.setItem("DataBlocks", JSON.stringify(newData));
    handleClose();
  };

  const LabelForm = () => {
    const [typeDetails, setTypeDetails] = useState({
      type: droppedItemData.type,
      xCoord: droppedItemData.xCoord,
      yCoord: droppedItemData.yCoord,
      text: '',
      fontSize: '',
      fontWeight: '',
    });
    return (
      <React.Fragment>
        <TextField
          label='Text'
          variant="outlined"
          margin="dense"
          fullWidth
          style={{ marginBottom: 20 }}
          value={typeDetails.text}
          onChange={(e) => { setTypeDetails({ ...typeDetails, text: e.target.value }) }}
        />
        <TextField
          label='X'
          variant="outlined"
          margin="dense"
          fullWidth
          value={typeDetails.xCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Y'
          variant="outlined"
          margin="dense"
          fullWidth
          value={typeDetails.yCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Font Size'
          variant="outlined"
          margin="dense"
          fullWidth
          value={typeDetails.fontSize}
          onChange={(e) => { setTypeDetails({ ...typeDetails, fontSize: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Font Weight'
          variant="outlined"
          margin="dense"
          fullWidth
          value={typeDetails.fontWeight}
          onChange={(e) => { setTypeDetails({ ...typeDetails, fontWeight: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <Button
          onClick={(e) => onSubmit(e, typeDetails)}
          style={{
            backgroundColor: '#0044c1', color: 'white', padding: 5, textTransform: 'none', borderRadius: 3,
          }}
          variant="outlined"
        >
          Save Changes
        </Button>
      </React.Fragment>
    );
  }

  const FormLoader = () => {
    switch (droppedItemData.type) {
      case 'Label':
        return <LabelForm />;
      case `Input`:
        return null;
      case 'Button':
        return null;
      default:
        return null;
    }
  }

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