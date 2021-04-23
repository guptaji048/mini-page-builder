import React, { useState, useEffect } from 'react';
import { FormLabel, TextField, Button, makeStyles } from '@material-ui/core';
import DropModal from './DropModal';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
  },
  button: {
    backgroundColor: '#0044c1',
    color: 'white',
    padding: 5,
    textTransform: 'none',
    borderRadius: 3,
  }
}));

function DroppablePanel() {
  const classes = useStyles();
  const [droppedItemData, setDroppedItemData] = useState(null);
  const [storedBlocksData, setStoredBlocksData] = useState([]);

  const handleOnDrop = (e) => {
    const id = e.dataTransfer.getData('id');
    const droppedObject = {
      type: id,
      xCoord: e.clientX,
      yCoord: e.clientY,
    };
    setDroppedItemData(droppedObject);
  };

  const BlockLoader = ({ blockData, key }) => {
    switch (blockData.type) {
      case 'Label':
        return (
          <FormLabel
            draggable
            style={{
              position: 'absolute',
              left: `${blockData.xCoord}px`,
              top: `${blockData.yCoord}px`,
              fontSize: `${blockData.fontSize}px`,
              fontWeight: `${blockData.fontWeight}`,
              color: 'black',
            }}
          >
            {blockData.text}
          </FormLabel>
        );
      case 'Input':
        return (
          <TextField
            className={classes.textField}
            type={blockData.inputType}
            variant="outlined"
            margin="dense"
            style={{
              position: 'absolute',
              left: `${blockData.xCoord}px`,
              top: `${blockData.yCoord}px`,
            }}
          />
        );
      case 'Button':
        return (
          <Button
            className={classes.button}
            variant="outlined"
            style={{ position: 'absolute', left: `${blockData.xCoord}px`, top: `${blockData.yCoord}px` }}
          >
            {blockData.buttonLabel}
          </Button>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("DataBlocks"));
    if (storedData !== null) {
      setStoredBlocksData(storedData);
    }
  }, [droppedItemData]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => handleOnDrop(e)}
    >
      {storedBlocksData.length !== 0 && storedBlocksData.map((block) => <BlockLoader blockData={block} key={block.id} />)}
      {droppedItemData && (<DropModal setDroppedItemData={setDroppedItemData} droppedItemData={droppedItemData} />)}
    </div>
  )
}

export default DroppablePanel
