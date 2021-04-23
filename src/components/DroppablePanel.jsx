import React, { useState, useEffect } from 'react';
import { FormLabel, TextField, Button, makeStyles } from '@material-ui/core';
import DropModal from './DropModal';

const useStyles = makeStyles((theme) => ({
  label: {
    color: 'black',
    border: '0px solid',
    '&:focus-within .makeStyles-label-56': {
      border: '5px solid #53c9fc !important',
    },
    '&:focus-within': {
      border: '2px solid #53c9fc !important',
    },
    "&$focused": {
      color: "red"
    }
  },
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
    '&:focus-within': {
      border: '2px solid #53c9fc',
    },
  },
  button: {
    backgroundColor: '#0044c1',
    color: 'white',
    padding: 5,
    textTransform: 'none',
    borderRadius: 3,
    '&:focus-within': {
      border: '2px solid #53c9fc',
    },
    '&:hover': {
      backgroundColor: '#0044c1',
    }
  }
}));

function DroppablePanel() {
  const classes = useStyles();
  const [droppedItemData, setDroppedItemData] = useState(null);
  const [storedBlocksData, setStoredBlocksData] = useState([]);

  const handleDrag = (e, id) => {
    e.dataTransfer.setData('existingBlockId', id);
  };

  const handleOnDrop = (e) => {
    e.stopPropagation();
    const newBlockId = e.dataTransfer.getData('newBlockId');
    const existingBlockId = e.dataTransfer.getData('existingBlockId');

    if (newBlockId.length !== 0) {
      const droppedObject = {
        type: newBlockId,
        xCoord: e.clientX,
        yCoord: e.clientY,
      };
      return setDroppedItemData(droppedObject);
    }

    if (existingBlockId.length !== 0) {
      const updatedBlocksData = storedBlocksData.map(el => el.id.toString() === existingBlockId ? { ...el, xCoord: e.clientX, yCoord: e.clientY, } : el);
      setStoredBlocksData(updatedBlocksData);
      localStorage.setItem("DataBlocks", JSON.stringify(updatedBlocksData));
    }

  };

  const BlockLoader = ({ blockData, key }) => {
    const [border, setBorder] = useState(false);
    switch (blockData.type) {
      case 'Label':
        return (
          <div onKeyDown={(e) => console.log(e.key)} tabIndex={-1}>
            <FormLabel
              key={key}
              className={classes.label}
              style={{
                position: 'absolute',
                left: `${blockData.xCoord}px`,
                top: `${blockData.yCoord}px`,
                fontSize: `${blockData.fontSize}px`,
                fontWeight: `${blockData.fontWeight}`,
                border: border ? '2px solid #d95409' : null,
              }}
              draggable
              onDragStart={(e) => handleDrag(e, blockData.id)}
              onClick={(e) => setBorder(!border)}
            >
              {blockData.text}
            </FormLabel>
          </div>
        );
      case 'Input':
        return (
          <TextField
            key={key}
            className={classes.textField}
            type={blockData.inputType}
            placeholder={blockData.placeHolder}
            variant="outlined"
            margin="dense"
            style={{
              position: 'absolute',
              left: `${blockData.xCoord}px`,
              top: `${blockData.yCoord}px`,
            }}
            draggable
            onDragStart={(e) => handleDrag(e, blockData.id)}
          />
        );
      case 'Button':
        return (
          <Button
            key={key}
            className={classes.button}
            variant="outlined"
            style={{ position: 'absolute', left: `${blockData.xCoord}px`, top: `${blockData.yCoord}px` }}
            draggable
            onDragStart={(e) => handleDrag(e, blockData.id)}
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
