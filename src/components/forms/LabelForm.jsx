import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import DropDown from '../utils/DropDown';

const LabelForm = ({ droppedItemData, handleClose }) => {
  const [labelDetails, setLabelDetails] = useState({
    id: droppedItemData.id !== undefined ? droppedItemData.id : 1,
    type: droppedItemData.type,
    xCoord: droppedItemData.xCoord,
    yCoord: droppedItemData.yCoord,
    text: droppedItemData.text !== undefined ? droppedItemData.text : '',
    fontSize: droppedItemData.fontSize !== undefined ? droppedItemData.fontSize : '',
    fontWeight: droppedItemData.fontWeight !== undefined ? droppedItemData.fontWeight : '',
  });
  const fontWeightOptions = ['400', '500', '600', '700'];

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
    console.log(storedData);
    const newData = storedData === null || storedData.length === 0 ? [typeDetails] : [...storedData, { ...typeDetails, id: maxId + 1 }];
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
      <DropDown
        label='Font Weight'
        value={labelDetails.fontWeight}
        options={fontWeightOptions}
        onChange={(e) => { setLabelDetails({ ...labelDetails, fontWeight: e.target.value }) }}
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

LabelForm.propTypes = {
  droppedItemData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LabelForm;
