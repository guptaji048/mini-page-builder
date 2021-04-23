import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const ButtonForm = ({ droppedItemData, handleClose }) => {
  const [buttonDetails, setButtonDetails] = useState({
    id: 1,
    type: droppedItemData.type,
    xCoord: droppedItemData.xCoord,
    yCoord: droppedItemData.yCoord,
    variant: '',
    buttonLabel: '',
  });

  const onSubmit = async (e, typeDetails) => {
    e.preventDefault();
    const storedData = await JSON.parse(localStorage.getItem("DataBlocks"));
    const idList = storedData === null ? [] : storedData.map((a) => a.id);
    const maxId = Math.max(...idList);
    const newData = storedData === null ? [typeDetails] : [...storedData, { ...typeDetails, id: maxId + 1 }];
    localStorage.setItem("DataBlocks", JSON.stringify(newData));
    handleClose();
  };

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
        label='Variant'
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

export default ButtonForm;