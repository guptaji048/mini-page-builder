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
    const [labelDetails, setLabelDetails] = useState({
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
          value={labelDetails.text}
          onChange={(e) => { setLabelDetails({ ...labelDetails, text: e.target.value }) }}
        />
        <TextField
          label='X'
          variant="outlined"
          margin="dense"
          fullWidth
          value={labelDetails.xCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Y'
          variant="outlined"
          margin="dense"
          fullWidth
          value={labelDetails.yCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Font Size'
          variant="outlined"
          margin="dense"
          fullWidth
          value={labelDetails.fontSize}
          onChange={(e) => { setLabelDetails({ ...labelDetails, fontSize: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Font Weight'
          variant="outlined"
          margin="dense"
          fullWidth
          value={labelDetails.fontWeight}
          onChange={(e) => { setLabelDetails({ ...labelDetails, fontWeight: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <Button
          onClick={(e) => onSubmit(e, labelDetails)}
          style={{
            backgroundColor: '#0044c1', color: 'white', padding: 5, textTransform: 'none', borderRadius: 3,
          }}
          variant="outlined"
        >
          Save Changes
        </Button>
      </React.Fragment>
    );
  };

  const InputForm = () => {
    const [inputDetails, setinputDetails] = useState({
      type: droppedItemData.type,
      xCoord: droppedItemData.xCoord,
      yCoord: droppedItemData.yCoord,
      inputType: '',
      variant: '',
      placeHolder: '',
    });
    return (
      <React.Fragment>
        <TextField
          label='Placeholder'
          variant="outlined"
          margin="dense"
          fullWidth
          style={{ marginBottom: 20 }}
          value={inputDetails.placeHolder}
          onChange={(e) => { setinputDetails({ ...inputDetails, placeHolder: e.target.value }) }}
        />
        <TextField
          label='Font Size'
          variant="outlined"
          margin="dense"
          fullWidth
          value={inputDetails.inputType}
          onChange={(e) => { setinputDetails({ ...inputDetails, inputType: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Font Weight'
          variant="outlined"
          margin="dense"
          fullWidth
          value={inputDetails.variant}
          onChange={(e) => { setinputDetails({ ...inputDetails, variant: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='X'
          variant="outlined"
          margin="dense"
          fullWidth
          value={inputDetails.xCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Y'
          variant="outlined"
          margin="dense"
          fullWidth
          value={inputDetails.yCoord}
          style={{ marginBottom: 20 }}
        />
        <Button
          onClick={(e) => onSubmit(e, inputDetails)}
          style={{
            backgroundColor: '#0044c1', color: 'white', padding: 5, textTransform: 'none', borderRadius: 3,
          }}
          variant="outlined"
        >
          Save Changes
        </Button>
      </React.Fragment>
    )
  };

  const ButtonForm = () => {
    const [buttonDetails, setButtonDetails] = useState({
      type: droppedItemData.type,
      xCoord: droppedItemData.xCoord,
      yCoord: droppedItemData.yCoord,
      variant: '',
      buttonLabel: '',
    });
    return (
      <React.Fragment>
        <TextField
          label='Button Label'
          variant="outlined"
          margin="dense"
          fullWidth
          style={{ marginBottom: 20 }}
          value={buttonDetails.buttonLabel}
          onChange={(e) => { setButtonDetails({ ...buttonDetails, buttonLabel: e.target.value }) }}
        />
        <TextField
          label='Font Size'
          variant="outlined"
          margin="dense"
          fullWidth
          value={buttonDetails.variant}
          onChange={(e) => { setButtonDetails({ ...buttonDetails, variant: e.target.value }) }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='X'
          variant="outlined"
          margin="dense"
          fullWidth
          value={buttonDetails.xCoord}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label='Y'
          variant="outlined"
          margin="dense"
          fullWidth
          value={buttonDetails.yCoord}
          style={{ marginBottom: 20 }}
        />
        <Button
          onClick={(e) => onSubmit(e, buttonDetails)}
          style={{
            backgroundColor: '#0044c1', color: 'white', padding: 5, textTransform: 'none', borderRadius: 3,
          }}
          variant="outlined"
        >
          Save Changes
        </Button>
      </React.Fragment>
    )
  }

  const FormLoader = () => {
    switch (droppedItemData.type) {
      case 'Label':
        return <LabelForm />;
      case 'Input':
        return <InputForm />;
      case 'Button':
        return <ButtonForm />;
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