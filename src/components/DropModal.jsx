import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Dialog, DialogContent, DialogTitle, Divider, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LabelForm from './forms/LabelForm';
import InputForm from './forms/InputForm';
import ButtonForm from './forms/ButtonForm';

function DropModal({ setSelectedItemData, selectedItemData }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedItemData(null);
  };

  const FormLoader = () => {

    switch (selectedItemData.type) {
      case 'Label':
        return <LabelForm droppedItemData={selectedItemData} handleClose={handleClose} />;
      case 'Input':
        return <InputForm droppedItemData={selectedItemData} handleClose={handleClose} />;
      case 'Button':
        return <ButtonForm droppedItemData={selectedItemData} handleClose={handleClose} />;
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
          <Typography variant="h5" align="left">Edit {selectedItemData.type}</Typography>
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

DropModal.propTypes = {
  setSelectedItemData: PropTypes.func.isRequired,
  selectedItemData: PropTypes.object.isRequired,
};

export default DropModal;