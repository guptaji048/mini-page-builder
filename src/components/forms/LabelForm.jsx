import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const LabelForm = ({ droppedItemData, handleClose }) => {
  const [labelDetails, setLabelDetails] = useState({
    id: 1,
    type: droppedItemData.type,
    xCoord: droppedItemData.xCoord,
    yCoord: droppedItemData.yCoord,
    text: '',
    fontSize: '',
    fontWeight: '',
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

export default LabelForm;
