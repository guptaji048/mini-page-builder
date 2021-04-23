import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

const ButtonForm = ({ droppedItemData, handleClose }) => {
  const [buttonDetails, setButtonDetails] = useState({
    id: droppedItemData.id !== undefined ? droppedItemData.id : 1,
    type: droppedItemData.type,
    xCoord: droppedItemData.xCoord,
    yCoord: droppedItemData.yCoord,
    buttonLabel: droppedItemData.buttonLabel !== undefined ? droppedItemData.buttonLabel : '',
  });

  const onSubmit = async (e, typeDetails) => {
    e.preventDefault();
    const storedData = await JSON.parse(localStorage.getItem("DataBlocks"));
    const idList = storedData === null ? [] : storedData.map((a) => a.id);
    const maxId = Math.max(...idList);
    if (droppedItemData.id !== undefined) {
      const updatedBlocksData = storedData.map(el => el.id === droppedItemData.id ? typeDetails : el);
      localStorage.setItem("DataBlocks", JSON.stringify(updatedBlocksData));
      return handleClose();
    }
    const newData = storedData === null || storedData.length === 0 ? [typeDetails] : [...storedData, { ...typeDetails, id: maxId + 1 }];
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

ButtonForm.propTypes = {
  droppedItemData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ButtonForm;
