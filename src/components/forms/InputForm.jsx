import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const InputForm = ({ droppedItemData, handleClose }) => {
  const [inputDetails, setinputDetails] = useState({
    id: 1,
    type: droppedItemData.type,
    xCoord: droppedItemData.xCoord,
    yCoord: droppedItemData.yCoord,
    inputType: '',
    variant: '',
    placeHolder: '',
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
        label='Placeholder'
        variant="outlined"
        margin="dense"
        fullWidth
        style={{ marginBottom: 20 }}
        value={inputDetails.placeHolder}
        onChange={(e) => { setinputDetails({ ...inputDetails, placeHolder: e.target.value }) }}
      />
      <TextField
        label='Input Type'
        variant="outlined"
        margin="dense"
        fullWidth
        value={inputDetails.inputType}
        onChange={(e) => { setinputDetails({ ...inputDetails, inputType: e.target.value }) }}
        style={{ marginBottom: 20 }}
      />
      <TextField
        label='Variant'
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

export default InputForm;
